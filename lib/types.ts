// lib/types.ts
export interface Author {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
}

export interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: {
    rendered: string;
  };
  slug: string;
  date: string;
  tags?: number[]; // Array of tag IDs
  _embedded?: {
    "wp:featuredmedia"?: {
      0: { source_url: string };
    };
    author?: Author[];
  };
}

export type Posts = Post[]; // Type alias for an array of posts

// Project type
export interface Project {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  tags: number[];
  acf: ProjectACF;
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
    }[];
  };
}

// Project type for static generation
export interface ProjectACF {
  short_description: string;
  live_url: string;
  situation: string;
  situation_image: number | null;
  task: string;
  task_image: number | null;
  result: string;
  results_image: number | null;
  before_image: number | null;
  after_image: number | null;
}

// Tag type
export interface Tag {
  id: number;
  name: string;
  slug: string;
}

// New type for image data
export interface ImageDetails {
  width: number;
  height: number;
  file?: string;
  filesize?: number;
  sizes?: {
    [key: string]: {
      file: string;
      width: number;
      height: number;
      filesize: number;
      mime_type: string;
      source_url: string;
    };
  };
  image_meta?: {
    aperture?: string;
    credit?: string;
    camera?: string;
    caption?: string;
    created_timestamp?: string;
    copyright?: string;
    focal_length?: string;
    iso?: string;
    shutter_speed?: string;
    orientation?: string;
  };
}

export interface ImageData {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: any[];
  description: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details?: ImageDetails;
  source_url: string;
}

export interface ImageReturn {
  url: string;
  width?: number;
  height?: number;
  alt: string;
}
