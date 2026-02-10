import { Link } from "@/i18n/navigation";
import { Info } from "lucide-react";

const FO_SecTitle = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) => {
  return (
    <div className="flex gap-2">
      <h2 className="font-bold text-xl md:text-2xl text-primary">{children}</h2>
      <Link href={`/faq${id ? `?slug=${id}` : ""}`}>
        <Info size={20} className="mt-0.5" />
      </Link>
    </div>
  );
};

export default FO_SecTitle;
