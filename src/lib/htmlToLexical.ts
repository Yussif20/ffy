export function htmlToLexical(htmlString: string): string {
  try {
    // Create a temporary DOM element to parse HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Process nodes recursively
    const processNode = (node: Node): any => {
      // Handle text nodes
      if (node.nodeType === Node.TEXT_NODE) {
        const textContent = node.textContent?.trim();
        if (!textContent) return null;

        return {
          type: "text",
          text: textContent,
          format: 0, // Default no formatting
          style: "",
          mode: "normal",
          detail: 0,
        };
      }

      // Handle element nodes
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();

        // Paragraph
        if (tagName === "p") {
          const children = Array.from(element.childNodes)
            .map(processNode)
            .filter(Boolean);

          return {
            type: "paragraph",
            format: "",
            indent: 0,
            direction: "ltr",
            children: children.length
              ? children
              : [{ type: "text", text: "", format: 0 }],
          };
        }

        // Headings
        if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName)) {
          const children = Array.from(element.childNodes)
            .map(processNode)
            .filter(Boolean);

          return {
            type: "heading",
            tag: tagName,
            format: "",
            indent: 0,
            direction: "ltr",
            children: children.length
              ? children
              : [{ type: "text", text: "", format: 0 }],
          };
        }

        // Lists
        if (tagName === "ul" || tagName === "ol") {
          const children = Array.from(element.children)
            .filter((child) => child.tagName.toLowerCase() === "li")
            .map(processNode)
            .filter(Boolean);

          return {
            type: "list",
            listType: tagName === "ul" ? "bullet" : "number",
            format: "",
            indent: 0,
            direction: "ltr",
            children: children,
          };
        }

        // List items
        if (tagName === "li") {
          const children = Array.from(element.childNodes)
            .map(processNode)
            .filter(Boolean);

          return {
            type: "listitem",
            value: 1, // Default value for ordered lists
            checked: false,
            format: "",
            indent: 0,
            direction: "ltr",
            children: children.length
              ? children
              : [{ type: "text", text: "", format: 0 }],
          };
        }

        // Links
        if (tagName === "a") {
          const children = Array.from(element.childNodes)
            .map(processNode)
            .filter(Boolean);

          return {
            type: "link",
            url: element.getAttribute("href") || "",
            target: element.getAttribute("target") || "_self",
            rel: element.getAttribute("rel") || null,
            title: element.getAttribute("title") || null,
            format: "",
            indent: 0,
            direction: "ltr",
            children: children.length
              ? children
              : [{ type: "text", text: "", format: 0 }],
          };
        }

        // Code blocks
        if (tagName === "pre") {
          const codeElement = element.querySelector("code");
          const content = codeElement
            ? codeElement.textContent || ""
            : element.textContent || "";

          return {
            type: "code",
            language: element.getAttribute("data-language") || "javascript",
            format: "",
            indent: 0,
            direction: "ltr",
            children: [
              {
                type: "text",
                text: content,
                format: 16, // Code format flag
                style: "",
                mode: "normal",
                detail: 0,
              },
            ],
          };
        }

        // Line breaks
        if (tagName === "br") {
          return {
            type: "linebreak",
            version: 1,
          };
        }

        // Formatting elements that wrap text
        const formatFlags: { [key: string]: number } = {
          strong: 1, // Bold
          b: 1, // Bold
          em: 2, // Italic
          i: 2, // Italic
          s: 4, // Strikethrough
          strike: 4, // Strikethrough
          u: 8, // Underline
          code: 16, // Code
          mark: 32, // Highlight
        };

        if (formatFlags.hasOwnProperty(tagName)) {
          const children = Array.from(element.childNodes)
            .map(processNode)
            .filter(Boolean);

          // Apply formatting to text nodes
          const applyFormatting = (nodes: any[]): any[] => {
            return nodes.map((node) => {
              if (node.type === "text") {
                return {
                  ...node,
                  format: node.format | formatFlags[tagName],
                };
              } else if (node.children) {
                return {
                  ...node,
                  children: applyFormatting(node.children),
                };
              }
              return node;
            });
          };

          return applyFormatting(children)[0] || null;
        }

        // For other elements, process children recursively
        const children = Array.from(element.childNodes)
          .map(processNode)
          .filter(Boolean);

        if (children.length > 0) {
          // Return first child if there's only one, otherwise wrap in paragraph
          if (children.length === 1) {
            return children[0];
          }

          // Default to paragraph for unhandled block elements
          return {
            type: "paragraph",
            format: "",
            indent: 0,
            direction: "ltr",
            children: children,
          };
        }

        return null;
      }

      return null;
    };

    // Get the body content and process it
    const bodyChildren = Array.from(doc.body.childNodes)
      .map(processNode)
      .filter(Boolean);

    // Create the root structure
    const rootNode = {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      children: bodyChildren.length
        ? bodyChildren
        : [
            {
              type: "paragraph",
              format: "",
              indent: 0,
              direction: "ltr",
              children: [{ type: "text", text: "", format: 0 }],
            },
          ],
    };

    // Create the full Lexical state
    const lexicalState = {
      root: rootNode,
    };

    return JSON.stringify(lexicalState);
  } catch (error) {
    console.error("Failed to convert HTML to Lexical:", error);
    return JSON.stringify({
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            direction: "ltr",
            children: [
              {
                type: "text",
                text: "Error converting content",
                format: 0,
              },
            ],
          },
        ],
      },
    });
  }
}
