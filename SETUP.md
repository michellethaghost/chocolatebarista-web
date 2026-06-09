# TCB Website — Setup Guide

**"The Interactive Newspaper"**
Built May 2026 · The Chocolate Barista

---

## What's Built

A complete, multi-page static website in the TCB newspaper style:

| File | Page |
|---|---|
| `index.html` | Homepage — newspaper front page |
| `about.html` | About — Michelle's story + awards |
| `journal.html` | Journal — blog listing with category filters |
| `journal-post.html` | Sample blog post (template for all posts) |
| `services.html` | Services — consulting, speaking, writing + Calendly |
| `contact.html` | Contact — form wired to Formspree |
| `css/style.css` | All styles — TCB design system |
| `js/main.js` | Navigation, carousel, animations, form |

---

## Four Things to Wire Up

The site is complete and works locally right now. To go fully live, four services need your account credentials plugged in. Each takes under 10 minutes.

---

### 1. FORMSPREE — Contact form (emails to michelle@ghosttown.world)

**What it does:** When someone submits the contact form, you get an email.

**Steps:**
1. Go to [formspree.io](https://formspree.io) and sign up (free tier handles up to 50 submissions/month; paid tier removes limits)
2. Click **+ New Form**
3. Set the email to `michelle@ghosttown.world`
4. Copy the **Form ID** — looks like: `xabc1234`
5. Open `contact.html`
6. Find this line: `action="https://formspree.io/f/FORMSPREE_FORM_ID"`
7. Replace `FORMSPREE_FORM_ID` with your actual ID

**Done.** The form now submits to your inbox. Test it by submitting something.

---

### 2. CALENDLY — Booking calendar (services page)

**What it does:** The calendar on the Services page shows your real availability and lets people book a 30-minute intro call.

**Steps:**
1. Go to [calendly.com](https://calendly.com) and sign up or log in
2. Create a **New Event Type** — name it "Intro Conversation" or "Book a Conversation," 30 minutes
3. Set your availability, buffer times, and confirmation messaging
4. Copy your event URL — looks like: `https://calendly.com/michelle-johnson/intro-conversation`
5. Open `services.html`
6. Find: `data-url="https://calendly.com/YOUR-CALENDLY-USERNAME/intro-conversation"`
7. Replace with your real URL

**Optional:** Calendly integrates directly with Google Calendar, iCloud, or Outlook — turn this on in Calendly settings so bookings block time on your real calendar automatically.

---

### 3. BEHOLD.SO — Instagram grid (homepage)

**What it does:** Shows your latest Instagram posts in a live, auto-updating grid on the homepage.

**Steps:**
1. Go to [behold.so](https://behold.so) — sign up free (free tier shows 9 posts; paid shows more)
2. Connect your Instagram account
3. Create a **Feed Widget** — choose a grid layout, adjust columns, turn off header if you prefer clean
4. Copy the **Widget ID** from the embed code (looks like: `abc12345`)
5. Open `index.html`
6. Find: `<div id="behold-widget-BEHOLD_WIDGET_ID"></div>`
7. Replace `BEHOLD_WIDGET_ID` with your real widget ID
8. Delete or hide the `ig-placeholder` div below it

**Alternatively:** [Elfsight](https://elfsight.com/instagram-feed-widget/) also works well and has more styling options — same process, different widget embed code.

---

### 4. YOUTUBE — Video embeds

**What it does:** Your real YouTube videos appear in the homepage and video section.

**Steps:**
1. Open `index.html`
2. Find all instances of `VIDEO_ID_1`, `VIDEO_ID_2` — these are placeholder YouTube video IDs
3. Go to each of your YouTube videos, click **Share** → **Embed**, and copy the ID from the `src` URL (the part after `https://www.youtube.com/embed/`)
4. Replace the placeholder IDs with your real video IDs
5. Update the titles and dates in `.video-card__title` and `.video-card__meta` below each video
6. Also update the **Watch on YouTube** link: `https://www.youtube.com/@YourChannelHandle` → your real channel handle

---

## Press Logos — Carousel

Right now the carousel shows text-only press names. To add real logos:

1. Get the logo PNG or SVG from each press outlet (usually available in their press kit, or you can find them via a web search for "[Publication Name] logo SVG")
2. Save them in a new `website/assets/press/` folder
3. Open `index.html` and find the `<a class="press-logo press-logo--text">` elements
4. Replace with: `<a class="press-logo"><img src="assets/press/logo-filename.png" alt="Publication Name"></a>`
5. Update the `href` with the actual press URL

White logos on the dark background look best — the CSS already applies `filter: brightness(0) invert(1)` to images, which forces them to white automatically.

---

## Colors — Verify Against Brand Manual

The TCB Purple used in the CSS (`--tcb-purple: #4B2D8A`) is an approximation based on the design system description. Before deploying:

1. Open `Brand Manual v1.0` (in your project files)
2. Find the exact hex code for TCB Purple
3. Open `css/style.css` and update line 19: `--tcb-purple: #4B2D8A;`
4. Also update `--tcb-purple-light` and `--tcb-purple-dark` proportionally

---

## Deploy — Going Live

The site is a set of plain HTML/CSS/JS files — no server, no CMS, no build step required. Upload it anywhere:

| Platform | How |
|---|---|
| **Squarespace / Wix** | Not compatible — those are drag-and-drop builders |
| **GitHub Pages** | Free · Upload the `website/` folder to a GitHub repo, enable Pages |
| **Netlify** | Free · Drag and drop the `website/` folder at [netlify.com/drop](https://netlify.com/drop) — live in 60 seconds |
| **Vercel** | Free · Connect a GitHub repo or drag-and-drop |
| **Hostinger / DreamHost / Bluehost** | Paid hosting · Upload via FTP or cPanel File Manager |
| **Your existing domain host** | If ghosttown.world is already hosted, upload to a `/tcb/` subdirectory or create a subdomain `tcb.ghosttown.world` |

**Recommended quick start:** Netlify Drop. Drag the entire `website/` folder to netlify.com/drop — it goes live immediately on a Netlify URL. Then you add your custom domain in Netlify settings.

---

## Newsletter Sign-Up

The newsletter form on the homepage is currently a placeholder. Replace with:

- **ConvertKit** (now Kit): Create a form in your Kit account, copy the embed code, paste it into the newsletter section in `index.html`
- **Mailchimp**: Create an Embedded Form, copy the HTML, replace the `<form>` block in `index.html`
- **Substack**: Add your Substack link to the subscribe button and remove the form

---

## Adding New Blog Posts

Duplicate `journal-post.html` for each new post. Update:
1. `<title>` — post title
2. `.page-hero__eyebrow` — category
3. `.page-hero__title` — post headline
4. `.page-hero__deck` — subhead / deck
5. `.byline` — date and read time
6. `.post-body` — your full article text
7. Hero image `src`
8. Add the new post as an `<article>` card in `journal.html`

---

## Support

If you need help deploying, adding pages, or wiring any of the integrations above — open a new conversation in Cowork and share this folder. We built it together, we can update it together.

---

*Built by Claude (Cowork) for The Chocolate Barista · May 2026*

---

## Update Log

### June 9, 2026 — Official Launch Day 🎉

**Site status:** Fully live at `thechocolatebarista.com`. Phase 0 infrastructure complete.

**Mobile fixes**
- Fixed dateline strip overlap: center span resets to `position: static; transform: none` at 768px
- Fixed newsletter horizontal overflow: `#newsletter > div` grid collapses to single column at 768px; first/last name row collapses; padding resets

**Hero section**
- Headline updated: *"The Chocolate Barista is a multimedia coffee culture publication showcasing the fine art of fostering unfettered belonging through hospitality."*
- Font: Cormorant Garamond, normal weight, no caps — `clamp(2.5rem, 5vw, 3.6rem)`
- "fine art" styled purple + italic: `<em style="color: var(--tcb-purple);">`
- Deck shortened and de-italicized: *"Essays and dispatches will go live shortly. Subscribe to be among the first to read."* — 1.1rem
- Hover underline scoped away from hero card: `.article-card:not(.article-card--hero):hover .article-card__headline`

**Branding**
- Page `<title>` updated to `The Chocolate Barista` (tagline removed)
- `favicon.svg` added to all 10 HTML pages
