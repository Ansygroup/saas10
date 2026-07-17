#!/usr/bin/env bash
# Generates per-product launch copy you can paste into communities.
# Usage: bash outreach.sh > outreach_posts.md
cd "$(dirname "$0")"

declare -A P=(
  [invoiceflow]="InvoiceFlow|Invoicing that runs itself for freelancers"
  [snippetvault]="SnippetVault|Code snippets organized, searchable, synced"
  [linktrack]="LinkTrack|Short links with real click analytics"
  [formcraft]="FormCraft|No-code forms that convert"
  [mailpulse]="MailPulse|Email capture that grows your list"
  [timetrack]="TimeTrack|Time tracking that pays freelancers"
  [pdfshift]="PDFShift|All your PDF tools in the browser"
  [statuspage]="StatusPage|Uptime monitoring your users trust"
  [chatwidget]="ChatWidget|Live chat that converts visitors"
  [resumebuilder]="ResumeBuilder|AI resumes that get hired"
)

for k in "${!P[@]}"; do
  IFS='|' read -r name tag <<< "${P[$k]}"
  echo "## $name — $tag"
  echo ""
  echo "**Reddit (r/Entrepreneur, r/SaaS, r/freelance):**"
  echo "Hey all — I built $name: $tag. Free tier, no card needed. Would love feedback from this community. What feature would make this a daily driver for you?"
  echo ""
  echo "**Product Hunt tagline:**"
  echo "$name — $tag"
  echo ""
  echo "**Tweet:**"
  echo "Just launched $name 🚀 $tag. Free to start. RTs appreciated! #buildinpublic #SaaS"
  echo ""
  echo "---"
  echo ""
done
