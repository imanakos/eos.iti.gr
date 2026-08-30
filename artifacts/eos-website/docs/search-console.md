# Connecting EOS to Google Search Console

Use these steps after the improved site has been merged and the GitHub Pages deployment has completed.

The site is already prepared with a crawlable `robots.txt` file and a sitemap containing the main pages, EO Analysis Notes, news articles, stable research and tools pages, and project case studies. Google Search Console still requires one action from the site owner: signing in to Google and completing ownership verification.

## 1. Add the correct property

1. Open [Google Search Console](https://search.google.com/search-console/).
2. Sign in with the Google account that you want to use for the site. This sign-in must be completed by you. Do not share your Google password.
3. Select **Add property**.
4. Choose **URL prefix**, not **Domain**.
5. Enter this exact address, including the final slash:

   `https://imanakos.github.io/eos.iti.gr/`

A URL-prefix property is appropriate because this site is published in a project folder on `github.io`. A Domain property would require control of the DNS for `github.io`, which is not available to an individual GitHub Pages project.

## 2. Verify ownership with the HTML tag

1. In the verification choices, expand **HTML tag**.
2. Copy the complete meta tag supplied by Google. It will resemble the example below, but the real token will be unique:

   `<meta name="google-site-verification" content="PASTE_GOOGLE_TOKEN_HERE" />`

   Do not publish the placeholder shown above.

3. Add Google's complete tag inside the `<head>` section of `artifacts/eos-website/index.html`. Place it outside the `eos:metadata` marker block so that route metadata generation never replaces it.
4. Commit the change, merge it into `master`, and wait for the **Deploy to GitHub Pages** workflow to finish successfully.
5. Open the live homepage and check its page source to confirm that the exact Google verification tag is present.
6. Return to Search Console and select **Verify**.

You can provide the complete verification meta tag to Codex and ask for it to be inserted. The Google sign-in and the final **Verify** selection must still be completed by you. The verification tag is not a password, but it should remain in the website after verification so that Google can confirm ownership again later.

For Google's current verification guidance, see [Verify your site ownership](https://support.google.com/webmasters/answer/9008080).

## 3. Submit the sitemap

After verification:

1. Open the new EOS property in Search Console.
2. In the left menu, open **Sitemaps**.
3. Under **Add a new sitemap**, enter `sitemap.xml` and submit it.
4. Confirm that Search Console shows this address:

   `https://imanakos.github.io/eos.iti.gr/sitemap.xml`

The status may initially say that Google is processing the sitemap. It should later change to **Success**. The sitemap updates automatically whenever the site is rebuilt, so its address does not need to be changed when new content is added.

Google's sitemap guidance is available at [Manage your sitemaps using Search Console](https://support.google.com/webmasters/answer/7451001).

## 4. Request indexing for priority pages

Use **URL inspection** for a small number of important pages first. Paste each full address, wait for the inspection, and select **Request indexing** when that option is available.

Suggested starting pages:

- `https://imanakos.github.io/eos.iti.gr/`
- `https://imanakos.github.io/eos.iti.gr/research/`
- `https://imanakos.github.io/eos.iti.gr/research/projects/wqems-water-quality-monitoring/`
- `https://imanakos.github.io/eos.iti.gr/research/projects/snapearth-geoai/`
- `https://imanakos.github.io/eos.iti.gr/eo-insights/`
- `https://imanakos.github.io/eos.iti.gr/eo-insights/can-satellites-detect-water-pollution/`
- `https://imanakos.github.io/eos.iti.gr/news/`
- `https://imanakos.github.io/eos.iti.gr/news/ioannis-manakos-co-chaired-gistam-2026-in-benidorm-spain/`

There is no need to request every news page individually. The submitted sitemap and the site's internal links provide Google with the complete set of URLs. Requesting the key pages simply gives Google a useful starting point.

See [URL Inspection tool](https://support.google.com/webmasters/answer/9012289) for Google's current instructions.

## 5. Read the reports

Search Console data is not immediate. Initial reports can take several days to appear, and discovering all archive pages can take longer.

- **Performance** shows Google Search clicks, impressions, search terms, countries, devices, and average positions.
- **Pages** shows which submitted URLs are indexed and why another URL may not yet be indexed.
- **Core Web Vitals** highlights groups of pages with speed or interaction concerns after Google has collected enough field data.
- **Links** shows how Google understands internal and external links to the site.

Check the reports after the first week, then periodically. A page that is discovered but not immediately indexed is not necessarily broken. Use URL inspection to examine the exact reason before changing content.

## Prepared technical files

- Live crawler instructions: `https://imanakos.github.io/eos.iti.gr/robots.txt`
- Live sitemap: `https://imanakos.github.io/eos.iti.gr/sitemap.xml`
- EO Analysis Notes feed: `https://imanakos.github.io/eos.iti.gr/eo-insights.xml`

These files are generated or copied during the normal production build and do not require a separate upload.
