import { getProjects, getTags, getPosts } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Posts from "@/components/Posts";
import { Section, Container } from "@/components/Layout";

export default async function Home() {
  const [posts, projects, tagsMap] = await Promise.all([
    getPosts(),
    getProjects(),
    getTags(),
  ]);

  return (
    <div className="flex flex-col items-center">
      <Hero />

      <AboutMe />

      <Section className="bg-muted">
        <Container>
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
            Featured Projects
          </h2>
          <Posts
            posts={projects}
            tagsMap={tagsMap}
            postBasePath="/projects"
            limit={3}
          />
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
          <Posts
            posts={posts}
            tagsMap={tagsMap}
            postBasePath="/blog"
            limit={3}
          />
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

export const revalidate = 300;
