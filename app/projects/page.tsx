import { getProjects } from "@/lib/wordpress";
import PostCard from "@/components/PostCard";
import { Container, Section } from "@/components/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Projects | Michael Vozzo",
  description:
    "Browse my latest projects and see how I help clients acheive their digital goal.",
};

export const dynamic = "auto";
export const revalidate = 600;

export default async function ProjectPage() {
  let posts: any[] = [];
  try {
    posts = await getProjects();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

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
              <PostCard post={post} basePath="/projects" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
