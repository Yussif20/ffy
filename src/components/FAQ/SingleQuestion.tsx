import { FAQ } from "@/types";
import slug from "slug";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { visibleText } from "@/utils/visibleText";
import FAQAction from "./FAQAction";

export default function SingleQuestion({
  faq,
  isArabic,
  nextFaq,
  prevFaq,
}: {
  faq: FAQ;
  isArabic: boolean;
  nextFaq: FAQ;
  prevFaq: FAQ;
}) {
  return (
    <AccordionItem
      value={slug(faq.question)}
      className="border rounded-lg px-4"
    >
      <div className="flex items-center gap-2">
        <AccordionTrigger className="text-left flex-1 hover:no-underline">
          {visibleText(isArabic, faq.question, faq.questionArabic)}
        </AccordionTrigger>
        <FAQAction faq={faq} nextFaq={nextFaq} prevFaq={prevFaq} />
      </div>
      <AccordionContent>
        <div
          className="danger-html"
          dangerouslySetInnerHTML={{
            __html: visibleText(isArabic, faq.answer, faq.answerArabic),
          }}
        />
        {/* {visibleText(isArabic, faq.answer, faq.answerArabic)} */}
      </AccordionContent>
    </AccordionItem>
  );
}
