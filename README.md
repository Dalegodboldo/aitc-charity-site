# Always In The Club Foundation — website

The official website for [Always In The Club Foundation](https://alwaysintheclub.org), a 501(c)(3) nonprofit (EIN #85-4015614) focused on youth mentorship and arts education through reunited Mouseketeers of the 1989 "All New" Mickey Mouse Club.

Built with **Next.js 16** (App Router) + **Tailwind CSS v4**, hosted on **Vercel**.

---

## For the site owner (Dale)

Almost everything can be done by asking Claude Code in plain language. The notes below are for the times you want to do something yourself.

### Run the site on your own computer

```
cd ~/Documents/aitc-charity-site
npm run dev
```

Then open <http://localhost:3000>. Press `Ctrl+C` in the terminal to stop.

### Add a blog post

See [`content/blog/README.md`](content/blog/README.md) — short answer: ask Claude Code, *"Create a new blog post titled '…' with this content: …"*. The file format is documented there too.

### Add or replace an image

Drop the file into `public/images/` (any name is fine, no spaces preferred). Reference it as `/images/your-file.png` from anywhere in the code or a Markdown post.

### Wire up the contact form (one-time, ~5 minutes)

1. Sign in at <https://formspree.io> and create a new form.
2. Formspree gives you an endpoint like `https://formspree.io/f/abc12345`. Copy the `abc12345` part.
3. Open `.env.local.example`, save it as `.env.local` (note: no `.example`), and paste the ID after `NEXT_PUBLIC_FORMSPREE_ID=`.
4. Restart the dev server, or push to GitHub and add the same env var to Vercel's project settings → Environment Variables.

### Deploy to Vercel (one-time)

1. Sign in at <https://vercel.com> with your GitHub account (`Dalegodboldo`).
2. Click **Add New… → Project**, find `aitc-charity-site`, click **Import**.
3. Accept the defaults — Vercel auto-detects Next.js. Click **Deploy**.
4. (Optional) Add `NEXT_PUBLIC_FORMSPREE_ID` under **Settings → Environment Variables** so the contact form works in production.
5. (Optional) **Settings → Domains** → add `alwaysintheclub.org` and `www.alwaysintheclub.org`. Vercel will show you the DNS records to set at GoDaddy.

Every future `git push` to `main` redeploys automatically.

### Repository layout

```
src/app/                 — every URL on the site is a folder here
  page.tsx               — homepage
  layout.tsx             — site-wide header/footer wrapper + SEO defaults
  programs/page.tsx      — /programs
  impact/page.tsx        — /impact
  about/page.tsx         — /about
  team/page.tsx          — /team
  blog/page.tsx          — /blog index
  blog/[slug]/page.tsx   — /blog/<post>
  sitemap.ts             — generates /sitemap.xml
  robots.ts              — generates /robots.txt
  icon.png               — favicon (Foundation heart logo)
src/components/site/     — header, footer, hero, cards, contact form…
src/lib/site-config.ts   — all external URLs, social links, contact info
src/lib/blog.ts          — reads Markdown posts from content/blog/
content/blog/            — Markdown posts (one .md file per post)
public/images/           — every image used on the site (~80 from the old GoDaddy site)
public/downloads/        — PDFs offered on the Programs page
public/IMAGE_MANIFEST.md — every harvested image, with original source
```

---

## For developers

Built on the standard Next.js App Router stack with a few opinionated choices.

### Stack

- Next.js 16, React 19, TypeScript 5
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- shadcn/ui base components, but every shadcn semantic token is remapped in `globals.css` to the Heartfelt & Editorial palette so default components blend in
- `next/font/google` for Fraunces (display) and Inter (sans/UI)
- Markdown blog: `gray-matter` + `remark` + `remark-html` + `@tailwindcss/typography` with brand prose overrides
- Formspree for the contact form (no backend, no database)

### Design tokens

Defined as Tailwind v4 `@theme` tokens in `src/app/globals.css`:

| Token         | Hex     | Use |
|---------------|---------|-----|
| `red`         | #AB0707 | Primary CTAs, links, accents |
| `red-deep`    | #8A0606 | Hover state |
| `gold`        | #C8922A | Eyebrows, small flourishes |
| `cream`       | #F7F2E8 | Page background |
| `warm-white`  | #FBF7EF | Card backgrounds, alternating sections |
| `ink`         | #20140F | Headings, primary text |
| `warm-gray`   | #6F6253 | Body text, muted UI |
| `border`      | #E4DAC6 | Hairlines |

### Scripts

```
npm run dev         start the dev server on :3000
npm run build       production build (static export, no server needed)
npm run start       serve the production build
npm run lint        ESLint
```

### Environment variables

| Variable                     | Required for                  |
|------------------------------|-------------------------------|
| `NEXT_PUBLIC_FORMSPREE_ID`   | Team page contact form        |

See `.env.local.example` for setup steps.

### Notes

- **No backend.** Donations go to Zeffy, the store is Shopify (mmcreunion.com), newsletter is Sender, contact form is Formspree, events/booking live on the existing main site. We just link out.
- **The brief** for this rebuild lives at `aitc-build-brief.md` in the repo root — it's the source of truth for content and design decisions.
- All copy comes verbatim from the brief; no invented statistics, quotes, or partner relationships.
