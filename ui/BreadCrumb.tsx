import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

const Breadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-1.5 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-sm font-medium text-foreground px-2 py-1 border rounded-full bg-black text-white border-black ">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href ?? "#"}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 border rounded-full bg-white text-black border-black"
                  >
                    {item.label}
                  </Link>
                  <LuChevronRight size={14} className="text-muted-foreground/50" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
