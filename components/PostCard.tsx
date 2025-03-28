import Link from "next/link";
import Image from "next/image";
import TagList from "./TagList";

type PostCardProps = {
  post: any;
  tagsMap: Record<number, any>;
  basePath: string; // Add a basePath prop
};

export default function PostCard({ post, tagsMap, basePath }: PostCardProps) {
  const featuredImageUrl =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
  const postTags = post.tags?.map((tagId: number) => tagsMap[tagId]) || [];

  // Construct the link dynamically using basePath
  const postLink = `${basePath}/${post.slug}`;

  return (
    <div className="post-card">
      <div className="h-auto bg-gray-200 relative aspect-[3/2]">
        {featuredImageUrl ? (
          <Image
            src={featuredImageUrl}
            alt={post.title.rendered}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className="aspect-[3/2] object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-col p-8 bg-white dark:bg-gray-950 flex-1">
        <span className="text-sm block mb-1">
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
        <h2 className="text-xl font-semibold mb-2">
          <Link href={postLink} className="hover:underline clickable-parent">
            {post.title.rendered}
          </Link>
        </h2>

        {postTags.length > 0 && <TagList tags={postTags} />}

        {post.excerpt && (
          <div
            className="line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
        )}
      </div>
    </div>
  );
}
