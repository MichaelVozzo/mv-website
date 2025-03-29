import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjects, getTags, getProject, getImageById } from "@/lib/api";
import { Project, ProjectACF } from "@/lib/types";
import TagList from "@/components/TagList";
import { CalendarIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Layout";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Breadcrumbs from "@/components/BreadCrumbs";

// Define the params type
type Params = {
  params: {
    slug: string;
  };
};

// Function required for static site generation
export async function generateStaticParams() {
  const posts = await getProjects();
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default async function SinglePostPage({ params }: Params) {
  const fixit = await params;
  if (!fixit?.slug) {
    return notFound(); // Handle case where params is missing
  }

  const [post, tagsMap] = await Promise.all([
    getProject(fixit.slug),
    getTags(),
  ]);

  // Type the post variable
  const typedPost: Project = post;

  if (!post) {
    notFound();
  }

  // Get the featured image URL from the _embedded data
  const featuredImageUrl =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  // Get tag names for this post
  const postTags = post.tags?.map((tagId: number) => tagsMap[tagId]) || [];

  // Extract ACF fields
  const {
    short_description = "",
    live_url = "",
    situation = "",
    situation_image = null,
    task = "",
    task_image = null,
    result = "",
    results_image = null,
    before_image = null,
    after_image = null,
  }: ProjectACF = typedPost.acf || {};

  // Get situation/task/results images using the API function
  const [
    situationImageData, // Changed variable names to reflect the new data structure
    taskImageData,
    resultsImageData,
    beforeImageData,
    afterImageData,
  ] = await Promise.all([
    situation_image ? getImageById(situation_image) : null,
    task_image ? getImageById(task_image) : null,
    results_image ? getImageById(results_image) : null,
    before_image ? getImageById(before_image) : null,
    after_image ? getImageById(after_image) : null,
  ]);

  console.log(situationImageData);

  return (
    <Container className="py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs projectTitle={post.title.rendered} parentUrl="/projects" />

      {/* Hero Section */}
      <div className="mb-16">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Featured Image - Left Column */}
          {featuredImageUrl && (
            <div className="flex rounded-lg overflow-hidden">
              <Image
                src={featuredImageUrl || "/placeholder.svg"}
                alt={post.title.rendered}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}

          {/* Project Info - Right Column */}
          <div className="flex flex-col space-y-6">
            <div className="space-y-4">
              <h1
                className="text-4xl font-bold tracking-tight md:text-5xl"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />

              <div className="flex flex-col gap-4">
                <div className="flex items-center text-muted-foreground">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>
                    Completion Date:{" "}
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {postTags.length > 0 && <TagList tags={postTags} />}
              </div>
            </div>

            {short_description && (
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">{short_description}</p>
              </div>
            )}

            {live_url && (
              <div className="pt-2">
                <Button asChild className="gap-2">
                  <Link
                    href={live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live Project
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Details with Staggered Images */}
      <div className="flex flex-col gap-20 mt-20 md:gap-30 md:mt-30 max-w-6xl mx-auto">
        {/* The Brief/Situation - Image on Right */}
        {situation && (
          <section className="grid gap-8 md:gap-12 items-center project-col">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-bold mb-4">The Brief</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: situation }} />
              </div>
            </div>
            {situationImageData && (
              <div className="order-1 md:order-2 rounded-lg overflow-hidden">
                <Image
                  src={situationImageData.url || "/placeholder.svg"}
                  alt={situationImageData.alt || "The Brief"}
                  width={situationImageData.width || 600}
                  height={situationImageData.height || 400}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </section>
        )}

        {/* The Solution/Task - Image on Left */}
        {task && (
          <section className="grid gap-8 md:gap-12 items-center project-col">
            {taskImageData && (
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={taskImageData.url || "/placeholder.svg"}
                  alt={taskImageData.alt || "The Solution"}
                  width={taskImageData.width || 600}
                  height={taskImageData.height || 400}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold mb-4">The Solution</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: task }} />
              </div>
            </div>
          </section>
        )}

        {/* Before & After Comparison */}
        {beforeImageData && afterImageData && (
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
              The project before and after
            </h2>
            <div className="max-w-3xl mx-auto aspect-[3/2]">
              <BeforeAfterSlider
                beforeImage={{
                  src:
                    beforeImageData.url ||
                    "/placeholder.svg?height=720&width=1280",
                  alt: beforeImageData.alt || "Before image",
                }}
                afterImage={{
                  src:
                    afterImageData.url ||
                    "/placeholder.svg?height=720&width=1280",
                  alt: afterImageData.alt || "After image",
                }}
              />
            </div>

            <div className="mt-8 text-center text-muted-foreground">
              <p>Drag the slider to compare before and after images</p>
            </div>
          </div>
        )}

        {/* The Results - Image on Right */}
        {result && (
          <section className="grid gap-8 md:gap-12 items-center project-col">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-bold mb-4">The Results</h2>
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: result }} />
              </div>
            </div>
            {resultsImageData && (
              <div className="order-1 md:order-2 rounded-lg overflow-hidden">
                <Image
                  src={resultsImageData.url || "/placeholder.svg"}
                  alt={resultsImageData.alt || "The Results"}
                  width={resultsImageData.width || 600}
                  height={resultsImageData.height || 400}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </section>
        )}
      </div>

      {/* If there's additional content in the main WordPress content field, display it here */}
      {post.content.rendered && post.content.rendered.trim() !== "" && (
        <div className="mt-16">
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>
      )}
    </Container>
  );
}

// Generate metadata for the post
export async function generateMetadata({ params }: Params) {
  const fixit = await params;
  if (!fixit?.slug) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found",
    };
  }

  const post = await getProject(fixit.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found",
    };
  }

  return {
    title: post.title.rendered,
    description: post.acf.short_description
      ? post.acf.short_description.replace(/<[^>]*>/g, "").slice(0, 160)
      : "Project details",
  };
}
