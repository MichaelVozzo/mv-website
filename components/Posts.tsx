import { Posts as PostsType, Project as ProjectType } from "@/lib/types";
import PostCard from "@/components/PostCard";

interface PostsProps {
  posts: PostsType[] | ProjectType[];
  tagsMap: Record<number, any>;
  postBasePath: string;
  limit?: number;
}

export default function Posts({
  posts,
  tagsMap,
  postBasePath,
  limit,
}: PostsProps) {
  const displayedPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedPosts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} tagsMap={tagsMap} basePath={postBasePath} />
        </li>
      ))}
    </ul>
  );
}
