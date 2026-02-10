type LexicalNode = {
  type: string;
  text?: string;
  format?: number;
  style?: string;
  mode?: string;
  detail?: number;
  children?: LexicalNode[];
  tag?: string;
  url?: string;
  target?: string;
  rel?: string | null;
  title?: string | null;
  listType?: "bullet" | "number";
  value?: number;
  checked?: boolean;
  language?: string;
};

export function lexicalToHtml(lexicalJson: string): string {
  try {
    const lexical = JSON.parse(lexicalJson);

    const processNode = (node: LexicalNode): string => {
      if (!node) return "";

      // Helper to add inline style if exists
      const styleAttr = node.style ? ` style="${node.style}"` : "";

      switch (node.type) {
        case "root":
        case "paragraph":
          return `<p${styleAttr}>${(node.children || [])
            .map(processNode)
            .join("")}</p>`;

        case "heading":
          const tag = node.tag || "h1";
          return `<${tag}${styleAttr}>${(node.children || [])
            .map(processNode)
            .join("")}</${tag}>`;

        case "text":
          let text = node.text || "";

          // Apply formatting based on flags
          if (node.format) {
            if (node.format & 1) text = `<strong>${text}</strong>`;
            if (node.format & 2) text = `<em>${text}</em>`;
            if (node.format & 4) text = `<s>${text}</s>`;
            if (node.format & 8) text = `<u>${text}</u>`;
            if (node.format & 16) text = `<code>${text}</code>`;
            if (node.format & 32) text = `<mark>${text}</mark>`;
          }

          // Wrap in span if style exists
          if (node.style) {
            text = `<span style="${node.style}">${text}</span>`;
          }

          return text;

        case "link":
          return `<a href="${node.url || "#"}"${
            node.target ? ` target="${node.target}"` : ""
          }${node.rel ? ` rel="${node.rel}"` : ""}${
            node.title ? ` title="${node.title}"` : ""
          }${styleAttr}>${(node.children || []).map(processNode).join("")}</a>`;

        case "list":
          const listTag = node.listType === "number" ? "ol" : "ul";
          return `<${listTag}${styleAttr}>${(node.children || [])
            .map(processNode)
            .join("")}</${listTag}>`;

        case "listitem":
          const checkedAttr = node.checked ? " checked" : "";
          return `<li${checkedAttr}${styleAttr}>${(node.children || [])
            .map(processNode)
            .join("")}</li>`;

        case "code":
          const langAttr = node.language
            ? ` data-language="${node.language}"`
            : "";
          return `<pre${langAttr}${styleAttr}><code>${(node.children || [])
            .map(processNode)
            .join("")}</code></pre>`;

        case "linebreak":
          return "<br />";

        default:
          // Fallback: render children if present
          return (node.children || []).map(processNode).join("");
      }
    };

    return (lexical.root && processNode(lexical.root)) || "";
  } catch (error) {
    console.error("Failed to convert Lexical JSON to HTML:", error);
    return "<p>Error rendering content</p>";
  }
}
