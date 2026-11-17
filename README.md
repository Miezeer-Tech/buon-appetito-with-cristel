# Cooking With Cristel — preview site

A temporary, static preview for **Cooking With Cristel**, the home of the show **Buon Appetito with Cristel** (Cristel Monrose, celebrity chef). Built to the official *Cristel Monrose — Brand Guidelines* (Version 1.0, November 2026).

This folder is ready to drop into a GitHub Pages repo. The site itself is finished and can be opened locally today.

## Live URL

**Not published yet.** Cursor’s GitHub tools can read the connected account (`Miezeer-Tech`) but cannot create a repository or enable GitHub Pages. Once a public repo is created, the intended URL is:

https://miezeer-tech.github.io/buon-appetito-with-cristel/

See [Publish to GitHub Pages](#publish-to-github-pages) below.

## Preview locally

From this folder:

```bash
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765/

## What’s on the site

Navigation:

1. **Home** — official portrait, mission headline, “Pull up a chair,” show tagline, Food / Fashion / Beauty pillars
2. **Recipes** — sample layout for show dishes
3. **Quick Recipes** — “10 minutes or less” sample layout
4. **Vegan & Meatless** — sample vegan and non-meat cards
5. **Fashion & Cooking** — sample “shop the look” cards with affiliate-ready buttons
6. **About** — official brand story, mission, positioning, and a newsletter form

## What’s real vs placeholder

**Real, from the official brand guidelines**

- Name, show, and site: Cristel Monrose; *Buon Appetito with Cristel*; Cooking With Cristel; handle `@CookingWithCristel`
- Tagline, mission, positioning, and About copy
- Voice lines: “Pull up a chair,” “Salt your pasta water like the sea,” “A red lip and a glass of rosé fix almost anything,” sign-off “Buon appetito!”
- Palette, typography, wordmark rules, and the Italian-flag stripe
- Official photographs of Cristel (hero, about, gold-hoop detail, lemon-and-hydrangea still)

**Placeholder — clearly labeled, ready to replace**

- All recipe titles, times, diet tags, and descriptions in `js/data.js` (`placeholder: true`). Cards and the recipe dialog say “Recipe coming soon — sample layout.”
- All fashion/accessory “looks.” They are not outfits from the show. Shop buttons use `href="#"` and `data-affiliate="placeholder-..."`.
- The newsletter form. It is marked “Preview only — this form is not connected yet” and does not send anything.
- Food stills on recipe cards, and the cream heels photo, are Unsplash stock — not photos from the show.

The preview banner, sample badges, and footer also state this clearly. Search engines are asked not to index the preview (`noindex` and `robots.txt`).

## How to add real recipes and looks

Edit **`js/data.js`**. Each recipe needs `id`, `title`, `section` (`showcase`, `quick`, or `vegan`), `image`, `imageAlt`, and copy. Set `placeholder: false` when a dish is confirmed.

Each look needs `items` with a `name`, an `href` (the affiliate URL), and an `affiliate` id. Keep `href: "#"` until a partnership is live.

Put new images in `assets/images/` (WebP or JPEG, about 900px wide).

## Brand tokens (do not invent new colors)

| Token | Hex | Use |
| --- | --- | --- |
| White Wine | `#F2E8C4` | Main ground (~50%) |
| Rosé Pink | `#F2C4CE` | Backgrounds only, never text on light |
| Red Wine | `#722F37` | Headlines, buttons, dark panels (~18%) |
| Cellar | `#2E1A1E` | Body text |
| Italian Green / White / Red | `#009246` / `#F1F2F1` / `#CE2B37` | Flag stripe only, always together, in that order |

Fonts: Great Vibes (the name “Cristel” and one short accent phrase per layout), Playfair Display (headlines), Montserrat (body and labels). Fallbacks: Georgia, Arial.

## Publish to GitHub Pages

The connected GitHub account is **Miezeer-Tech**. Cursor cannot create the repo or turn on Pages. To publish:

1. On GitHub, create a new **public** repository named `buon-appetito-with-cristel` (empty, no README).
2. From this folder:

   ```bash
   git init
   git add .
   git commit -m "Add Cooking With Cristel preview site"
   git branch -M main
   git remote add origin https://github.com/Miezeer-Tech/buon-appetito-with-cristel.git
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Build and deployment**. Source: **Deploy from a branch**. Branch: `main`, folder: `/ (root)`. Save.
4. After a minute, the site should load at  
   https://miezeer-tech.github.io/buon-appetito-with-cristel/

If the Pages URL should use a different GitHub user or repo name, update the canonical URL, Open Graph image paths, and `sitemap.xml` to match.

## Screenshots

- Desktop (1280px): `shots/home-1280.png`
- Mobile (390px): `shots/home-390.png`

Above-the-fold and nav checks are also in `shots/`.

## Photo credits

Official portraits and prop details are cropped from the Cristel Monrose brand guidelines. Stock stills (layout only):

- Herb pasta — Unsplash `photo-1481931098730-318b6f776db0`
- Rosemary pizza — Unsplash `photo-1513104890138-7c749659a591`
- Berry tarts — Unsplash `photo-1464305795204-6f5bbfc7fb81`
- Tomato toast — Unsplash `photo-1506280754576-f6fa8a873550`
- Garden salad — Unsplash `photo-1540420773420-3366772f4999`
- Tomato rotini — Unsplash `photo-1608897013039-887f21d8c804`
- Market bowl — Unsplash `photo-1512621776951-a57141f2eefd`
- Studio heels — Unsplash `photo-1535043934128-cf0b28d52f95`
