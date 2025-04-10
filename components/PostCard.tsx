import Link from "next/link";
import Image from "next/image";

import { Post } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";

import { getFeaturedMediaById, getTagsByPost } from "@/lib/wordpress";
import { badgeVariants } from "./ui/badge";

type PostCardProps = {
  post: any;
  basePath: string; // Add a basePath prop
};

export default async function PostCard({ post, basePath }: PostCardProps) {
  const media = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;

  // Construct the link dynamically using basePath
  const postLink = `${basePath}/${post.slug}`;

  // get the tags
  const tags = await getTagsByPost(post.id);

  return (
    <div className="post-card">
      <div className="h-auto bg-gray-200 relative aspect-[3/2]">
        {media?.source_url ? (
          <Image
            src={media.source_url}
            alt={post.title?.rendered || "Post thumbnail"}
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

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className={badgeVariants({ variant: "default" })}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

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
