import sys, json, re

BRAVE_EXE = r"C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
USER_DATA = r"C:/Users/ansy0/projects/saas10/brave_profile_copy"
PROFILE = "Default"
PROJECT_REF = "xydtfroqekgvlsozaghj"
API_URL = f"https://supabase.com/dashboard/project/{PROJECT_REF}/settings/api"

from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir=USER_DATA,
            channel=None,
            executable_path=BRAVE_EXE,
            headless=False,
            args=[
                f"--profile-directory={PROFILE}",
                "--disable-blink-features=AutomationControlled",
            ],
        )
        page = ctx.new_page()
        print("goto", API_URL)
        page.goto(API_URL, wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(4000)
        # click any Reveal buttons
        try:
            for btn in page.get_by_text("Reveal", exact=False).all():
                try:
                    btn.click(timeout=2000)
                except Exception:
                    pass
            page.wait_for_timeout(2000)
        except Exception as e:
            print("reveal err", e)
        # grab all text + input values
        txt = page.inner_text("body")
        keys = {}
        for m in re.finditer(r'(eyJ[A-Za-z0-9_\-\.]{40,})', txt):
            keys.setdefault("jwt_body", []).append(m.group(1)[:80])
        # also try inputs (readonly masked values)
        for el in page.query_selector_all("input"):
            try:
                v = el.input_value()
                if v and len(v) > 20:
                    keys.setdefault("inputs", []).append(v[:120])
            except Exception:
                pass
        out = {"text_len": len(txt), "keys": keys}
        print(json.dumps(out, indent=2)[:4000])
        # save full body text for inspection
        open("supa_page_text.txt", "w", encoding="utf-8").write(txt)
        print("SAVED supa_page_text.txt")
        browser.close()

if __name__ == "__main__":
    main()
