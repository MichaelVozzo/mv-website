import Image from "next/image";
import { notFound } from "next/navigation";
import { getPost, getTags, getPosts } from "@/lib/api";
import { Post, Tag } from "@/lib/types";
import TagList from "@/components/TagList";

type Params = {
  params: {
    slug: string;
  };
};

// Function required for static site generation
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function SinglePostPage({ params }: Params) {
  const fixit = await params;
  if (!fixit?.slug) {
    return notFound(); // Handle case where params is missing
  }

  const [post, tagsMap] = await Promise.all([getPost(fixit.slug), getTags()]);
  // Type the post variable
  const typedPost: Post = post;

  if (!typedPost) {
    notFound();
  }

  const featuredImageUrl =
    typedPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  // Type the tagsMap variable
  const typedTagsMap: Record<number, string> = tagsMap;

  const postTags: string[] =
    typedPost.tags?.map((tagId: number) => typedTagsMap[tagId]) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1
            className="text-4xl font-bold mb-4"
            dangerouslySetInnerHTML={{ __html: typedPost.title.rendered }}
          />
          <div className="flex flex-wrap gap-4 text-gray-600 dark:text-white mb-4">
            <span>
              {new Date(typedPost.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
            {typedPost._embedded?.author?.[0]?.name && (
              <span>By: {typedPost._embedded.author[0].name}</span>
            )}
          </div>

          {postTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              <TagList tags={postTags} />
            </div>
          )}
        </header>

        {featuredImageUrl && (
          <div className="mb-8 relative aspect-video">
            <Image
              src={featuredImageUrl}
              alt={typedPost.title.rendered}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
        )}

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: typedPost.content.rendered }}
        />
      </article>
    </div>
  );
}

export async function generateMetadata({ params }: Params) {
  const fixit = await params;
  const post = await getPost(fixit.slug);
  const typedPost: Post = post;

  if (!typedPost) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found",
    };
  }

  return {
    title: typedPost.title.rendered,
    description: typedPost.excerpt.rendered
      .replace(/<[^>]*>/g, "")
      .slice(0, 160),
  };
}

export const revalidate = 300;
