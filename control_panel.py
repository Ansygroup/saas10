#!/usr/bin/env python3
"""saas10 Control Panel — one command to rule them all.
Run: python control_panel.py
Options: status | sales | content <app> | deploy <token> | video <app>
"""
import os, sys, argparse, subprocess

SAAS10 = "C:/Users/ansy0/projects/saas10"
TOKEN_FILE = "C:/Users/ansy0/.hermes/vercel_token"

def run(cmd):
    print(f"\n$ {cmd}")
    r = subprocess.run(cmd, cwd=SAAS10, shell=True, capture_output=True, text=True)
    print(r.stdout)
    if r.stderr: print(r.stderr)
    return r.returncode

def cmd_status():
    print("=== saas10 STATUS ===")
    run("cat STATUS.md")

def cmd_sales():
    print("=== GUMROAD SALES ===")
    run("python track_sales.py")

def cmd_content(app):
    print(f"=== CONTENT FOR {app} ===")
    run(f"python auto_marketing.py --app {app} --platform x")

def cmd_deploy(token):
    print("=== DEPLOY ALL 10 ===")
    run(f'./ship_all.sh "{token}"')

def cmd_video(app):
    print(f"=== VIDEO FOR {app} ===")
    run(f'python gen_heygen_video.py --app {app} --script "$(grep -A1 \'## {app}\' promo_scripts.md | tail -1)"')

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("action", nargs="?", default="status",
                    choices=["status", "sales", "content", "deploy", "video"])
    ap.add_argument("arg", nargs="?")
    args = ap.parse_args()

    if args.action == "status":
        cmd_status()
    elif args.action == "sales":
        cmd_sales()
    elif args.action == "content":
        if not args.arg:
            print("ERROR: specify app (e.g. invoiceflow)"); sys.exit(1)
        cmd_content(args.arg)
    elif args.action == "deploy":
        token = args.arg or open(TOKEN_FILE).read().strip() if os.path.exists(TOKEN_FILE) else ""
        if not token or token == "[REDACTED]":
            print("ERROR: no live Vercel token. Put it in ~/.hermes/vercel_token"); sys.exit(1)
        cmd_deploy(token)
    elif args.action == "video":
        if not args.arg:
            print("ERROR: specify app"); sys.exit(1)
        cmd_video(args.arg)

if __name__ == "__main__":
    main()
