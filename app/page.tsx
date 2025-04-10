import { getLatestPosts, getLatestProjects } from "@/lib/wordpress";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import { Section, Container } from "@/components/Layout";

export default async function Home() {
  let latestPosts: any[] = [];
  try {
    latestPosts = await getLatestPosts(3);
  } catch (error) {
    console.error("Failed to fetch latest posts:", error);
  }

  let latestProjects: any[] = [];
  try {
    latestProjects = await getLatestProjects(3);
  } catch (error) {
    console.error("Failed to fetch latest projects:", error);
  }

  return (
    <div className="flex flex-col items-center">
      <Hero />

      <AboutMe />

      <Section className="bg-muted">
        <Container>
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
            Featured Projects
          </h2>
          {/* Corrected Conditional Rendering and Mapping */}
          {latestProjects.length > 0 ? (
            // Add a container div for layout (e.g., grid)
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestProjects.map((post) => (
                <PostCard key={post.id} post={post} basePath="projects" />
              ))}
            </div>
          ) : (
            // Message shown if no posts are fetched
            <p className="text-center text-muted-foreground">No posts found.</p>
          )}
          {/* End Corrected Section */}
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
            Latest Blog Posts
          </h2>
          {/* Corrected Conditional Rendering and Mapping */}
          {latestPosts.length > 0 ? (
            // Add a container div for layout (e.g., grid)
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} basePath="blog" />
              ))}
            </div>
          ) : (
            // Message shown if no posts are fetched
            <p className="text-center text-muted-foreground">No posts found.</p>
          )}
          {/* End Corrected Section */}
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/blog">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
