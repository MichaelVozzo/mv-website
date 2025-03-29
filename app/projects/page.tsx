import { getProjects, getTags } from "@/lib/api";
import PostCard from "@/components/PostCard";
import { Container, Section } from "@/components/Layout";

export default async function ProjectPage() {
  const [posts, tagsMap] = await Promise.all([getProjects(), getTags()]);

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-2">My Projects</h1>
        <p className="text-xl mb-8">
          Explore my recent work and discover how I help clients achieve their
          digital goals.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <li key={post.id}>
              <PostCard post={post} tagsMap={tagsMap} basePath="/projects" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export const revalidate = 300;
