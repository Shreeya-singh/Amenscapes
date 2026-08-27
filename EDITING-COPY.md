# How to change website text

You do **not** need to know how to code.

All words on the Amenscapes site live in one folder:

**`src/content/`**

Change the words there, save the file, then look at the website. The layout stays the same.

---

## 1. Open the website so you can see your edits

Someone on the team should already have the site running. In the browser go to:

**http://localhost:3000**

If that page is blank or won’t load, ask a developer to run `npm run dev` first.

Keep that tab open. After you save a file, wait a second and refresh the page. Your new wording should be there.

---

## 2. Open the right file

In Cursor (or any editor), open the folder `src/content/`. Pick the file that matches the part of the site you want to change:

| What you see on the site | File to open |
|---|---|
| Browser tab title / Google snippet | `site.ts` |
| Top menu (Home, WordaLight, …) | `Navbar.ts` |
| Hero at the top (“Faith-Filled Word Search…”) | `WordGames.ts` |
| Email box + error messages | `NewsletterSignup.ts` |
| “Thanks for subscribing” / download popup | `DownloadPDF.ts` |
| WordaLight heading, books, buttons | `WordALightEditions.ts` |
| Bentobox section | `BentoBoxComingSoon.ts` |
| Apparel / t-shirt section | `ApparelComingSoon.ts` |
| About Us + mission box | `AboutAmenscapes.ts` |
| Footer (bottom of every page) | `Footer.ts` |

---

## 3. How to edit (the only rules)

Text always sits **inside quotes**:

```ts
heading: "About Us",
```

To change it, only change the words between the quotes:

```ts
heading: "Our Story",
```

Then save (`Ctrl+S` / `Cmd+S`) and refresh the website.

**Keep these as they are:**

- The name before the colon (`heading:`, `body:`, `title:`, …)
- The quotes around your text
- The comma at the end of the line
- Anything that is **not** inside quotes (`as const`, `{`, `}`, `href: "/#About"`)

If the site breaks after a save, you probably deleted a quote or a comma. Undo (`Ctrl+Z` / `Cmd+Z`) and try again.

### Apostrophes

Write them normally inside the quotes:

```ts
mission: "To illuminate God's Word through play.",
```

### Line breaks inside a sentence

In WordaLight blurbs, `\n` means “start a new line”:

```ts
blurb: "Classic ornate\nedition.",
```

That shows as:

```
Classic ornate
edition.
```

---

## 4. What each file actually changes

### `site.ts` — browser tab

| Field | What it is |
|---|---|
| `title` | Name in the browser tab |
| `description` | Short summary search engines use |

### `Navbar.ts` — top menu

| Field | What it is |
|---|---|
| `links` | Menu items. `label` is the word people click. Leave `href` and `id` alone unless a developer is helping. |
| `signup` | “Sign up with email” button on the phone menu |

### `WordGames.ts` — top of the homepage

| Field | What it is |
|---|---|
| `heading` | Big title |
| `body` | Line under the title |
| `heroAlt` | Description of the photo (for accessibility, not shown as a heading) |

### `NewsletterSignup.ts` — email form in the hero

| Field | What it is |
|---|---|
| `placeholderFull` | Hint text in the box (wide screens) |
| `placeholderShort` | Hint text on phones |
| `invalid` | Shown if the email is not valid |
| `error` | Shown if signup fails |

### `DownloadPDF.ts` — popup after signup

| Field | What it is |
|---|---|
| `success` | Message for a new subscriber |
| `alreadySubscribed` | Message if they already signed up |
| `cta` | Download button label |
| `filename` | Name of the file that downloads |

### `WordALightEditions.ts` — WordaLight block

| Field | What it is |
|---|---|
| `heading` | Section title |
| `tagline` | Line under the title |
| `playCta` | “Try the game NOW!” button |
| `playHref` | Where that button goes. `#` means “nowhere yet”. |
| `comingSoon` | Label on the edition that is not for sale yet |
| `editions` | The two books. Each has `title`, `blurb`, and optionally `cta` + `href` (buy button). |

To **hide** the buy button on an edition, delete that edition’s `href` and `cta` lines. The “Coming soon” label will show instead.

To **show** a buy button, add:

```ts
href: "https://your-gumroad-link.com",
cta: "Buy eBook on Gumroad",
```

Leave `src`, `width`, and `height` alone (those are the book images).

### `BentoBoxComingSoon.ts` — Bentobox block

| Field | What it is |
|---|---|
| `heading` | Section title |
| `badge` | The small “Coming soon” pill |
| `body` | Paragraph under it |
| `spreads` | The two page images. You can change `alt` (photo description). Leave `src` / `width` / `height` unless swapping images. |

### `ApparelComingSoon.ts` — t-shirt block

| Field | What it is |
|---|---|
| `heading` | Section title |
| `badge` | “Coming soon” pill |
| `body` | Paragraph |
| `tagline` | Small line at the bottom |
| `photo.alt` | Description of the t-shirt photo |

### `AboutAmenscapes.ts` — About Us

| Field | What it is |
|---|---|
| `heading` | “About Us” |
| `intro` | Paragraph under the heading |
| `pillars` | The three columns. Each has `title` and `body`. |
| `missionLabel` | Small line above the mission (`Our mission`) |
| `mission` | The mission sentence in the blue box |

You can rewrite a pillar, or reorder them by cutting and pasting a whole `{ title: ..., body: ... },` block. Keep three unless a developer is helping.

### `Footer.ts` — bottom of the page

| Field | What it is |
|---|---|
| `blurb` | Short paragraph next to the logo |
| `columns` | Shop / Company / Support lists. `heading` is the column title, `label` is the link text, `href` is where it goes. |
| `socialsHeading` | “Follow Us” |
| `socials` | Instagram / Facebook / Email. Change `href` when you have real links. |

Do not edit the `copyright:` line. The year updates by itself.

---

## 5. Common jobs

**Change a heading**
Open the matching file → find `heading: "..."` → change the words in quotes → save → refresh the site.

**Change a button**
Look for `cta:` or `playCta:` or `signup:`.

**Change where a button / menu item goes**
Look for `href:`. Use a full URL (`https://...`) for off-site links, or leave `#` if it is not ready.

**Add / remove / reorder About pillars**
Copy a whole pillar block, including the `{ }`, and paste it in the list. Keep the commas between them.

**Swap a photo**
Put the new image in the matching folder under `public/` (for example `public/Tshirt/`). Then change only the `src:` path so it matches the new file name. Ask a developer if you are unsure.

---

## 6. Check your work on the website

1. Save the content file.
2. Refresh **http://localhost:3000**.
3. Scroll to the section you changed.
4. Check desktop and a narrow window (phone menu, shorter email placeholder).

If the page is red / shows an error, undo your last edit and check quotes and commas.

---

## 7. Do not touch

- Anything outside `src/content/` (especially files ending in `.tsx`)
- Image sizes (`width`, `height`) unless you are swapping artwork
- Names like `heading`, `body`, `pillars` — only the quoted values

Those files control layout and design. If wording is not enough and you need a new section or a new button, ping a developer.
