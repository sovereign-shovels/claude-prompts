import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

export interface Prompt {
  id: string;
  title: string;
  content: string;
  tags: string[];
  destination?: string;
}

export function listPrompts(libraryPath: string): Prompt[] {
  if (!existsSync(libraryPath)) return [];
  const files = readdirSync(libraryPath).filter((f) => f.endsWith(".md"));
  return files
    .map((f) => {
      const raw = readFileSync(join(libraryPath, f), "utf-8");
      const parsed = matter(raw);
      return {
        id: f.replace(/\.md$/, ""),
        title: (parsed.data.title as string) || f,
        content: parsed.content.trim(),
        tags: (parsed.data.tags as string[]) || [],
        destination: (parsed.data.destination as string) || undefined,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function addPrompt(
  libraryPath: string,
  id: string,
  title: string,
  content: string,
  tags: string[] = [],
  destination?: string
) {
  const data: Record<string, unknown> = { title, tags };
  if (destination) data.destination = destination;
  const frontmatter = matter.stringify(content, data);
  writeFileSync(join(libraryPath, `${id}.md`), frontmatter);
}

export function getPrompt(libraryPath: string, id: string): Prompt | null {
  const path = join(libraryPath, `${id}.md`);
  if (!existsSync(path)) return null;
  const raw = readFileSync(path, "utf-8");
  const parsed = matter(raw);
  return {
    id,
    title: (parsed.data.title as string) || id,
    content: parsed.content.trim(),
    tags: (parsed.data.tags as string[]) || [],
    destination: (parsed.data.destination as string) || undefined,
  };
}
