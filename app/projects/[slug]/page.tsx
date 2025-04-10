import Link from "next/link";
import Image from "next/image";
import {
  getProjects,
  getProjectBySlug,
  getFeaturedMediaById,
  getTagsByPost,
  getImageById,
} from "@/lib/wordpress";
import { ProjectACF } from "@/lib/wordpress.d";
import { CalendarIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Layout";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Breadcrumbs from "@/components/BreadCrumbs";
import { siteConfig } from "@/site.config";
import type { Metadata } from "next";
import { badgeVariants } from "@/components/ui/badge";
import { notFound } from "next/navigation";

// Function required for static site generation
export async function generateStaticParams() {
  const posts = await getProjects();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getProjectBySlug(slug);

  if (!post) {
    return {};
  }

  // Safely get title
  const title = post.title.rendered;
  const shortDesc = (post.acf as ProjectACF)?.short_description ?? "";
  const description = shortDesc.replace(/<[^>]*>/g, "").trim();

  const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  ogUrl.searchParams.append("title", title);
  ogUrl.searchParams.append("description", description);

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "article",
      url: `${siteConfig.site_domain}/projects/${post.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getProjectBySlug(slug);

  if (!post) {
    notFound();
  }

  const featuredMedia = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;

  const tags = await getTagsByPost(post.id);

  // Extract ACF fields
  const acf = (post.acf || {}) as ProjectACF;
  const {
    short_description = "", // Use default values
    live_url = "",
    situation = "",
    situation_image = null, // Keep null default for image IDs
    task = "",
    task_image = null,
    result = "",
    results_image = null,
    before_image = null,
    after_image = null,
  } = acf;

  // Get situation/task/results images using the API function
  const [
    situationImageData, // Changed variable names to reflect the new data structure
    taskImageData,
    resultsImageData,
    beforeImageData,
    afterImageData,
  ] = await Promise.all([
    situation_image ? getImageById(situation_image) : Promise.resolve(null),
    task_image ? getImageById(task_image) : Promise.resolve(null),
    results_image ? getImageById(results_image) : Promise.resolve(null),
    before_image ? getImageById(before_image) : Promise.resolve(null),
    after_image ? getImageById(after_image) : Promise.resolve(null),
  ]);

  return (
    <Container className="py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs projectTitle={post.title.rendered} parentUrl="/projects" />

      {/* Hero Section */}
      <div className="mb-16">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Featured Image - Left Column */}
          {featuredMedia?.source_url && (
            <div className="flex rounded-lg overflow-hidden">
              <Image
                src={featuredMedia.source_url || "/placeholder.svg"}
                alt={post.title.rendered || "Project Image"}
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
