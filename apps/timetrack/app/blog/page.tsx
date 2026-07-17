import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

export const metadata = {
  title: '__NAME__ Blog — __TOPIC__',
  description: '__TOPIC__ tips and guides.',
};

export default async function BlogIndex() {
  let posts: { slug: string; title: string }[] = [];
  try {
    const files = await fs.readdir(POSTS_DIR);
    posts = files.filter((f) => f.endsWith('.md')).map((f) => {
      const raw = f.replace('.md', '');
      const title = raw.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      return { slug: raw, title };
    });
  } catch { posts = []; }
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900">__NAME__ Blog</h1>
      <p className="mt-2 text-slate-600">__TOPIC__.</p>
      <ul className="mt-8 space-y-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="text-lg font-semibold text-indigo-600 hover:underline">
              {p.title}
            </Link>
          </li>
        ))}
        {posts.length === 0 && <li className="text-slate-500">No posts yet.</li>}
      </ul>
    </main>
  );
}
