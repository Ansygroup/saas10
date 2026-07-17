#!/usr/bin/env python3
"""Auto-marketing helper for saas10.
- Reads thread + blog content from disk
- Prints copy-paste-ready posts for X / LinkedIn / Reddit
- Optionally triggers HeyGen video (if configured)
Run: python auto_marketing.py --app invoiceflow --platform x
"""
import os, argparse, glob

SAAS10 = "C:/Users/ansy0/projects/saas10"

def read_threads(app):
    tdir = os.path.join(SAAS10, "threads")
    out = {}
    for f in glob.glob(os.path.join(tdir, f"{app}_*.md")):
        name = os.path.basename(f).replace(f"{app}_", "").replace(".md", "")
        out[name] = open(f, encoding="utf-8").read()
    return out

def read_blog(app):
    bdir = os.path.join(SAAS10, "apps", app, "content", "blog")
    out = {}
    if os.path.isdir(bdir):
        for f in glob.glob(os.path.join(bdir, "*.md")):
            name = os.path.basename(f).replace(".md", "")
            out[name] = open(f, encoding="utf-8").read()
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--app", required=True)
    ap.add_argument("--platform", default="x")
    args = ap.parse_args()

    threads = read_threads(args.app)
    blogs = read_blog(args.app)

    print(f"=== {args.app} — {args.platform.upper()} ===\n")
    if args.platform == "x" and "thread" in threads:
        print(threads["thread"])
    elif args.platform == "linkedin" and "linkedin" in threads:
        print(threads["linkedin"])
    elif args.platform == "reddit" and "reddit" in threads:
        print(threads["reddit"])
    else:
        # fallback: print first blog post
        if blogs:
            first = list(blogs.values())[0]
            print(first)
    print("\n=== BLOG POSTS AVAILABLE ===")
    for k in blogs:
        print(f"  /blog/{k}")

if __name__ == "__main__":
    main()
