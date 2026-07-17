#!/usr/bin/env python3
"""Track Gumroad sales via Composio (connection ca_ru-ZbwXlFsGQ ACTIVE).
Prints daily sales count + revenue. Run on a schedule to monitor SaaS MVPs.
"""
import os, json
from composio import Composio

os.environ["COMPOSIO_API_KEY"] = open("C:/Users/ansy0/.hermes/composio_key").read().strip()
client = Composio()
CA = "ca_ru-ZbwXlFsGQ"
UID = "pg-test-92b5555b-8c3b-4c3a-8876-15f0a6b4eddc"

def get_sales():
    res = client.tools.execute(
        slug="GUMROAD_GET_SALES",
        arguments={},
        connected_account_id=CA,
        user_id=UID,
        dangerously_skip_version_check=True,
    )
    return res

if __name__ == "__main__":
    try:
        out = get_sales()
        data = out.get("data", {})
        # Gumroad returns sales list under various keys; print compact
        print(json.dumps(data, indent=2)[:1500])
    except Exception as e:
        print("ERROR:", e)
