# The Chocolate Barista — Project Context

Use this file to resume work with Claude in a new conversation. Paste the contents into your first message.

---

## Project Overview

**The Chocolate Barista** is a static HTML/CSS website for Michelle R. Johnson-Strickland — a newspaper-style editorial site about coffee culture, race, and hospitality.

- **Live site:** `thechocolatebarista.com` (custom domain, connected to Cloudflare Pages — may still be propagating)
- **Preview URL:** `tcbwebsite.pages.dev` (Cloudflare Pages, production = `main` branch)
- **Dev preview URL:** `dev.tcbwebsite.pages.dev` (Cloudflare Pages, preview = `dev` branch — shows the REAL site, no coming-soon)
- **Local folder:** `/Users/mrjstrickland/Documents/Claude/Projects/The Chocolate Barista/website/`
- **GitHub repo:** `https://github.com/michellethaghost/chocolatebarista-web.git` (branches: `main`, `dev`)
- **Email:** `hello@thechocolatebarista.com`
- **Kit (ConvertKit) account:** forms at `https://app.kit.com/forms/9421377/subscriptions`

---

## Infrastructure Setup (completed May 16, 2026)

- **Domain registrar:** GoDaddy (`thechocolatebarista.com`)
- **Nameservers:** Updated in GoDaddy to `meilani.ns.cloudflare.com` and `razvan.ns.cloudflare.com`
- **Cloudflare:** Domain added and active. Custom domain connected to Cloudflare Pages (`tcbwebsite` project).
- **Cloudflare Pages project:** `tcbwebsite` — auto-deploys `main` on push; `dev` branch also connected and auto-deploys.
- **DNS records:** No manual DNS records needed — Cloudflare Pages manages them when the custom domain is connected.

---

## Branch Strategy

| Branch | URL | What it shows |
|---|---|---|
| `main` | `thechocolatebarista.com` / `tcbwebsite.pages.dev` | Coming-soon page (public) |
| `dev` | `dev.tcbwebsite.pages.dev` | Real site — all pages visible |

**Coming-soon mode is active on `main`.** There is NO `_redirects` file. Instead, `index.html` on `main` contains the coming-soon page content (copied from `coming-soon.html`). To launch the real site, replace `index.html` on `main` with the real homepage from `dev`.

---

## File Structure

```
website/
├── index.html                        — On main: coming-soon page. On dev: real homepage.
├── coming-soon.html                  — Source of truth for coming-soon content (keep in sync with index.html on main)
├── journal.html                      — Journal listing
├── journal-post.html                 — Individual journal post template
├── about.html                        — About page
├── services.html                     — "Work With Me" page
├── contact.html                      — Contact page
├── work.html                         — Work portfolio page (written work, talks, partnerships)
├── work-partner-intelligentsia.html  — Brand partnership detail: Intelligentsia
├── work-partner-fellow.html          — Brand partnership detail: Fellow
├── work-partner-oatly.html           — Brand partnership detail: Oatly
├── css/
│   └── style.css       — All styles (design system tokens, layout, components)
├── js/
│   └── main.js         — Nav, carousel, animations, filters
└── assets/             — Images, fonts (if any)
```

---

## Design System

- **Brand purple:** `#5d2e7f` (CSS var: `--tcb-purple`)
- **Purple light:** `#7a4aa0` (`--tcb-purple-light`)
- **Purple dark:** `#3f1f58` (`--tcb-purple-dark`)
- **Display font:** Fraunces (used for headlines AND all buttons)
- **Body font:** Cormorant
- **UI font:** Inter (labels, meta, eyebrows only — NOT buttons)
- **Style:** Newspaper editorial — large masthead, article grid, press carousel, video section

---

## Coming-Soon Page (`coming-soon.html` / `index.html` on main)

Dark brown background (`#1A1208`). Self-contained — no external CSS or JS except Kit and Google Fonts.

**Current content:**
- Dateline strip: `Est. 2016` · `Coffee Culture · Education · Hospitality` · date
- Eyebrow: "Something good is brewing" (0.75rem Inter, uppercase)
- Title: "THE CHOCOLATE BARISTA" (Fraunces, all caps via `text-transform: uppercase`)
- Deck: "A new home for the writing, ideas, and conversations pushing coffee culture and hospitality forward."
- Divider: "Be the first to know"
- Setup guide text (0.9rem): "Enter your email below to receive your free Home Barista Setup Guide on launch."
- Kit signup form → `https://app.kit.com/forms/9421377/subscriptions`
- NOTIFY ME button (centered, Fraunces)
- Divider: "Follow along"
- Social links: Instagram + Threads
- Footer: © year The Chocolate Barista · thechocolatebarista.com

---

## Current Site State (main branch)

### Global (all pages on dev)

- **Header is NOT sticky** — `initStickyHeader()` in `main.js` is commented out.
- **Masthead border removed** — no `border-bottom` on `.masthead`.
- **Dateline strip order:** `Est. 2016` (left) · `Coffee Culture · Education · Hospitality` (center) · date (right)
- **Footer masthead removed** — footer starts directly with `footer-grid`.
- **Navigation:** Home · Journal · Work · About · Services · Contact (all pages, including footer)
- **Kit sticky bar removed** from all pages
- **Kit popup form kept** on all pages (`data-uid="787e052623"`)
- `ck.5.js` kept in `<head>` of all pages
- **All buttons use Fraunces** — `.tcb-btn` uses `var(--font-display)`, uppercase, 0.1em letter-spacing

### index.html — Section Order (dev branch / real homepage)

1. Dateline strip
2. Masthead / nav
3. Hero — Feature Story
4. `section-rule--heavy`
5. **From the Journal** — 3-col article grid, "See all journal entries" button (centered)
6. `section-rule--heavy`
7. **From the Studio · YouTube** — 1 video full-width, "Watch on YouTube" button (centered)
8. **As Seen In · Press** — scrolling carousel (black background)
9. `section-rule--heavy`
10. **Follow Along · Instagram** — Behold embed, "Follow @thechocolatebarista" button (centered)
11. **Stay in the Loop** — newsletter signup (purple background)
12. Footer

---

## Section Header Formatting

```html
<!-- Heavy rule ABOVE the section -->
<div class="page-wrap--wide"><hr class="section-rule--heavy"></div>

<!-- Section wrapper — padding-top:0 is essential -->
<section class="video-section" style="padding-top:0; padding-bottom:0;">
  <div class="page-wrap--wide">
    <div class="section-header">
      <div class="section-header__line"></div>
      <span class="section-label">Section Name</span>
      <div class="section-header__line"></div>
    </div>
    <!-- Content -->
    <div style="padding: 1.5rem 1.5rem 2rem; border-top: var(--hairline); text-align:center;">
      <a href="#" class="tcb-btn">Button Text</a>
    </div>
  </div>
</section>
```

---

## Key CSS Notes (style.css)

- `.masthead` — no `border-bottom`
- `.tcb-btn` — Fraunces display font, 700 weight, `font-variation-settings: 'opsz' 48, 'SOFT' 60, 'WONK' 0`, uppercase
- `.video-grid` — no `border-bottom`; only `border-top: 3px solid var(--tcb-black)` remains
- `.video-card__label` — `background: var(--tcb-cream)`
- Kit popup overrides at bottom of file targeting `[data-uid="787e052623"]` and `.formkit-modal`

---

## Known / Pending

- **`thechocolatebarista.com` custom domain** — connected and verifying in Cloudflare Pages. May take up to 48 hours to fully propagate. Once active, it will serve the coming-soon `index.html` from `main`.
- **Behold Instagram feed:** Widget ID `lOXbepzE67B1SjoccCjE` is live in code; depends on Behold.so account.
- **YouTube video embeds:** All iframes use placeholder IDs (`VIDEO_ID_1`, etc.) — real IDs needed in `index.html` and `work.html` on dev.
- **Feature image:** Hero section in `index.html` (dev) has a `<div>` placeholder — needs real image.
- **Journal posts:** `journal-post.html` is a template; no real posts linked yet.
- **Written work links:** Article cards in `work.html` use `href="#"` — real URLs needed.
- **Brand partnership pages:** Creative hero areas use placeholder divs.
- **journal-post.html masthead:** Still has old `masthead__top` strip and `masthead__subtitle`.
- **Email (MX record):** `hello@thechocolatebarista.com` doesn't have an MX record yet. Email delivery not set up.

---

## How to Push Changes

Michelle uses Terminal. Due to Terminal's "click-only" tier in Claude's desktop app, Claude writes commands to the clipboard and Michelle pastes them with ⌘V.

**"Sun's getting low"** = Michelle's signal to update this CONTEXT.md file with session changes.

If git lock files block a commit:
```bash
rm -f .git/HEAD.lock .git/index.lock
```

If local changes block a branch switch, save the file first:
```bash
cp coming-soon.html /tmp/cs_new.html && git stash && git checkout main && cp /tmp/cs_new.html index.html && ...
```

**Push to main (coming-soon updates):**
```bash
cd '/Users/mrjstrickland/Documents/Claude/Projects/The Chocolate Barista/website' && git checkout main && cp coming-soon.html index.html && git add coming-soon.html index.html && git commit -m 'Your message here' && git push origin main
```

**Push to dev (real site updates):**
```bash
cd '/Users/mrjstrickland/Documents/Claude/Projects/The Chocolate Barista/website' && git checkout dev && git add -A && git commit -m 'Your message here' && git push origin dev
```

Cloudflare Pages auto-deploys within ~60 seconds of a push.

---

## Things NOT to Change Without Asking

- Kit popup script (`data-uid="787e052623"`) — Michelle wants to keep this
- The `ck.5.js` script in `<head>` — needed for inline newsletter forms
- The Behold widget ID `lOXbepzE67B1SjoccCjE`
- Footer copyright line format
- The non-sticky header behavior — `initStickyHeader()` is intentionally disabled
