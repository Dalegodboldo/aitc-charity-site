# Blog posts

Every file in this folder ending in `.md` becomes a blog post on the site
at `/blog/<filename>`. For example, `welcome.md` becomes
`alwaysintheclub.org/blog/welcome`.

## How to add a new post

The easiest path: ask Claude Code to make one for you. Tell it:

> "Create a new blog post titled '<your title>' with this content: <your draft>"

That's it. Claude Code will create the file with the right frontmatter, the
right filename, and today's date.

## What a post file looks like

If you ever want to edit one by hand, the format is:

```markdown
---
title: "Your post title in quotes"
date: "2026-05-17"        # YYYY-MM-DD — newest posts show first
excerpt: "One sentence summary. Shown on the /blog index card."
coverImage: "/images/your-image.png"   # optional; live image lives in public/images/
author: "Always In The Club Foundation"  # or a Mouseketeer's name
---

Write the post body in **Markdown** below the second `---`. You can use:

- Headings: `## Like this`
- **Bold**, *italic*, [links](https://example.com)
- Bullet lists, numbered lists
- > Block quotes for pull-out lines
```

The body becomes formatted prose on the site — serif headings, comfortable
body type, gold bullets, all matching the rest of the site.

## Frontmatter fields

| Field        | Required | What it does                                           |
|--------------|----------|--------------------------------------------------------|
| `title`      | Yes      | The post heading and the browser tab title             |
| `date`       | Yes      | `YYYY-MM-DD`. Determines order on `/blog` (newest first) |
| `excerpt`    | Yes      | One-line teaser shown on the `/blog` index card        |
| `coverImage` | No       | Path under `public/`. Shown at top of post + on card   |
| `author`     | Yes      | Byline shown under the title                           |

## Images for posts

Put any new image into `public/images/` (or ask Claude Code to drop it
there for you). Then reference it as `/images/your-file.png` in
`coverImage` or inline in the post body with `![alt text](/images/your-file.png)`.
