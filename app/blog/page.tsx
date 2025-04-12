import { getAllPosts } from "@/lib/wordpress";
import PostCard from "@/components/PostCard";
import { Container, Section } from "@/components/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Michael Vozzo",
  description:
    "Check out Michael Vozzo's blog for insights on web development, design, and technology.",
};

export const dynamic = "auto";
export const revalidate = 600;

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <li key={post.id}>
              <PostCard post={post} basePath="/blog" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
