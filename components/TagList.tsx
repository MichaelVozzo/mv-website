import { badgeVariants } from "./ui/badge";

type TagListProps = {
  tags: any[];
};

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {tags.map((tag) => (
        <span key={tag.id} className={badgeVariants({ variant: "default" })}>
          {tag.name}
        </span>
      ))}
    </div>
  );
}
