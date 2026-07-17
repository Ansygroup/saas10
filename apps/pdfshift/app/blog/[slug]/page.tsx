import { promises as fs } from 'fs';
import path from 'path';
import React from 'react';

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

export async function generateStaticParams() {
  try {
    const files = await fs.readdir(POSTS_DIR);
    return files.filter((f) => f.endsWith('.md')).map((f) => ({ slug: f.replace('.md', '') }));
  } catch {
    return [];
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let body = '';
  try {
    body = await fs.readFile(path.join(POSTS_DIR, `${params.slug}.md`), 'utf-8');
  } catch {
    body = '# Not found\n\nThis post does not exist yet.';
  }
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <article className="prose">
        <pre className="whitespace-pre-wrap text-sm text-slate-700">{body}</pre>
      </article>
    </main>
  );
}
