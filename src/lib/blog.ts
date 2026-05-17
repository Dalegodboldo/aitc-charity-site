import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  author: string;
};

export type Post = PostFrontmatter & {
  slug: string;
};

export type PostWithContent = Post & {
  contentHtml: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

async function readPostFile(filename: string) {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = await readFile(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return { slug, data: data as PostFrontmatter, content };
}

export async function getAllPosts(): Promise<Post[]> {
  const files = await readdir(BLOG_DIR).catch(() => [] as string[]);
  const markdown = files.filter(
    (f) => /\.(md|mdx)$/i.test(f) && !/^readme\.mdx?$/i.test(f)
  );
  const posts = await Promise.all(
    markdown.map(async (f) => {
      const { slug, data } = await readPostFile(f);
      return { slug, ...data };
    })
  );
  // Newest first
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<PostWithContent | null> {
  if (/^readme$/i.test(slug)) return null;
  const files = await readdir(BLOG_DIR).catch(() => [] as string[]);
  const filename = files.find(
    (f) => f === `${slug}.md` || f === `${slug}.mdx`
  );
  if (!filename) return null;
  const { data, content } = await readPostFile(filename);
  const processed = await remark().use(remarkHtml).process(content);
  return {
    slug,
    ...data,
    contentHtml: processed.toString(),
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const files = await readdir(BLOG_DIR).catch(() => [] as string[]);
  return files
    .filter(
      (f) => /\.(md|mdx)$/i.test(f) && !/^readme\.mdx?$/i.test(f)
    )
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function formatPostDate(iso: string): string {
  // Posts use ISO date in frontmatter; render as e.g. "May 17, 2026".
  const d = new Date(iso);
  if (Number.isNaN(d.valueOf())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
