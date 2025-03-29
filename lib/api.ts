import { Author, ImageData, ImageReturn, Post, Project, Tag } from "./types";
const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

/**
 * Fetch all tags and return a map of tag IDs to tag objects.
 */
export async function getTags(): Promise<Record<number, string>> {
  const res = await fetch(`${BASE_URL}/tags`);

  if (!res.ok) {
    throw new Error("Failed to fetch tags");
  }

  const tags = await res.json();
  return tags.reduce((acc: Record<number, any>, tag: any) => {
    acc[tag.id] = tag;
    return acc;
  }, {});
}

/**
 * Fetch all posts.
 */
export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts?_embed`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

/**
 * Fetch all projects.
 */
export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/project?_embed`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }

  return res.json();
}

/**
 * Fetch a single post by slug.
 */
export async function getPost(slug: string): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts?slug=${slug}&_embed`);

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const posts = await res.json();
  return posts[0] || null;
}

/**
 * Fetch a single project by slug.
 */
export async function getProject(slug: string): Promise<Project> {
  const res = await fetch(`${BASE_URL}/project?slug=${slug}&_embed`);

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const posts = await res.json();
  return posts[0] || null;
}

/**
 * Fetch a image by ID.
 */
export async function getImageById(id: number): Promise<ImageReturn | null> {
  if (!id) return null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/media/${id}`
    );

    if (!response.ok) return null;

    const imageData: ImageData = await response.json();
    return {
      url: imageData.source_url,
      width: imageData.media_details?.width,
      height: imageData.media_details?.height,
      alt: imageData.alt_text,
    };
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}
