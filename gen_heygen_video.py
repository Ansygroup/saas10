#!/usr/bin/env python3
"""Generate a faceless promo video for a saas10 app via HeyGen (Composio ACTIVE).
Usage: python gen_heygen_video.py --app invoiceflow --script "your text"
Requires HEYGEN avatar group + voice configured in Composio connected account.
"""
import os, argparse, json
from composio import Composio

os.environ["COMPOSIO_API_KEY"] = open("C:/Users/ansy0/.hermes/composio_key").read().strip()
client = Composio()
CA = None  # fill from connected accounts for heygen
UID = "pg-test-92b5555b-8c3b-4c3a-8876-15f0a6b4eddc"

# find heygen connected account
resp = client.connected_accounts.list()
items = getattr(resp, "items", [])
for acc in items:
    if getattr(acc, "appName", "").lower() == "heygen":
        CA = acc.id
        break

def gen_video(script, title="saas10 promo"):
    res = client.tools.execute(
        slug="HEYGEN_CREATE_WEBM_VIDEO",
        arguments={"title": title, "script": script},
        connected_account_id=CA,
        user_id=UID,
        dangerously_skip_version_check=True,
    )
    return res

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--app", required=True)
    ap.add_argument("--script", required=True)
    args = ap.parse_args()
    if not CA:
        print("ERROR: no HeyGen connected account found")
        exit(1)
    try:
        out = gen_video(args.script, title=f"{args.app} promo")
        print(json.dumps(out, indent=2)[:1200])
    except Exception as e:
        print("ERROR:", e)
