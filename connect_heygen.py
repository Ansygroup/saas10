#!/usr/bin/env python3
"""Connect HeyGen to Composio (one-time OAuth). After this, gen_heygen_video.py works.
Usage: python connect_heygen.py
"""
import os, webbrowser
from composio import Composio

os.environ["COMPOSIO_API_KEY"] = open("C:/Users/ansy0/.hermes/composio_key").read().strip()
client = Composio()
UID = "pg-test-92b5555b-8c3b-4c3a-8876-15f0a6b4eddc"

# request connection (opens browser for OAuth)
conn = client.connected_accounts.initiate(
    app_name="heygen",
    user_id=UID,
)
print("Connection ID:", conn.id)
print("Auth URL:", conn.redirectUrl)
webbrowser.open(conn.redirectUrl)
print("\nOpen the URL above, log in to HeyGen, then re-run gen_heygen_video.py")
