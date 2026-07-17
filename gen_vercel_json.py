import os, json

# Maps app dir -> pnpm package name
apps = {
  "snippetvault": "@saas10/snippetvault",
  "linktrack": "@saas10/linktrack",
  "formcraft": "@saas10/formcraft",
  "mailpulse": "@saas10/mailpulse",
  "timetrack": "@saas10/timetrack",
  "pdfshift": "@saas10/pdfshift",
  "statuspage": "@saas10/statuspage",
  "chatwidget": "@saas10/chatwidget",
  "resumebuilder": "@saas10/resumebuilder",
}

TPL = """{{
  "buildCommand": "cd ../.. && pnpm install && pnpm --filter {pkg} build",
  "outputDirectory": ".next",
  "installCommand": "cd ../.. && pnpm install",
  "framework": "nextjs"
}}
"""

root = "C:/Users/ansy0/projects/saas10/apps"
for app, pkg in apps.items():
    path = os.path.join(root, app, "vercel.json")
    with open(path, "w", encoding="utf-8") as f:
        f.write(TPL.format(pkg=pkg))
    print("wrote", app, "vercel.json")
print("DONE")
