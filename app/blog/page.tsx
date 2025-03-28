import { getPosts, getTags } from "@/lib/api";
import PostCard from "@/components/PostCard";
import { Container, Section } from "@/components/Layout";

export default async function BlogPage() {
  const [posts, tagsMap] = await Promise.all([getPosts(), getTags()]);

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <li key={post.id}>
              <PostCard post={post} tagsMap={tagsMap} basePath="/blog" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
