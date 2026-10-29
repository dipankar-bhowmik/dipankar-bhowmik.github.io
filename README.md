# Dipankar Bhowmik — Portfolio Website

A responsive, static single-page portfolio built from the supplied résumé. The design direction is a dark, refined infrastructure/engineering aesthetic with mint accents, restrained motion, interactive skill tabs, an interactive patch-management workflow, and a résumé download.

## Files

- `index.html` — page content and semantic structure
- `styles.css` — visual design, responsive layouts, reduced-motion support
- `script.js` — mobile navigation, skill tabs, workflow interactions, command-copy control, reveal animations
- `assets/Dipankar-Bhowmik-Resume.pdf` — supplied résumé PDF
- `assets/favicon.svg` — portfolio favicon

## Preview locally

Open `index.html` in a current browser. The page uses Google Fonts when internet access is available and will fall back to system fonts otherwise. The résumé link works locally because the PDF is included.

## Publish

Upload the contents of this folder to a static host such as GitHub Pages, Netlify, or Cloudflare Pages. Keep the `assets` folder alongside the HTML, CSS, and JavaScript files so the résumé download and favicon continue to work.

## Before publishing

1. GitHub profile: https://github.com/Annoymous1524. Public repository linked separately: https://github.com/Annoymous1524/flask-k8s-devops. The CV does not include certificate verification links, so none are invented.
2. Review the visible phone number, email, LinkedIn URL, location, and résumé PDF before making the site public.
3. The patch-management terminal shows illustrative commands. The `flask-k8s-devops` repository is linked as a separate public repository; it is not presented as the patch-management project.
4. Skill descriptions retain “basics” and “exposure” where those qualifiers appeared in the source résumé.
5. The contact action uses a `mailto:` link and does not require a backend. A hosted contact form would need a form service or server-side implementation.

## Editing

Search the content in `index.html`. Colors and layout variables are at the top of `styles.css` under `:root`. Interactive text and workflow steps live in `script.js`.
