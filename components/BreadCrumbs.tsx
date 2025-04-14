import { ChevronRight } from "lucide-react";
import Link from "next/link";

// Breadcrumbs component
const Breadcrumbs = ({
  projectTitle,
  parentUrl,
}: {
  projectTitle: string;
  parentUrl: string;
}) => {
  return (
    <nav
      className="flex items-center text-sm text-muted-foreground mb-8 overflow-x-scroll"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link
            href={parentUrl}
            className="hover:text-foreground transition-colors"
          >
            Projects
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          <span
            className="text-foreground font-medium text-nowrap"
            aria-current="page"
          >
            {projectTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
