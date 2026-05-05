# DNS Setup: eos.iti.gr → GitHub Pages

## Current State (verified 2026-05-05)

`eos.iti.gr` currently resolves via an A record to `160.40.50.179` (ITI's existing server).
There is no CNAME record for `eos.iti.gr`. The site is **not yet reachable** via GitHub Pages at this domain.

```
; Verified via Google DNS-over-HTTPS (dns.google)
eos.iti.gr.  A  160.40.50.179   ← current (points to ITI server, not GitHub Pages)
```

## Required Change

Since `eos.iti.gr` is a **subdomain** (not an apex/root domain), a CNAME record is preferred.

### Option A — CNAME (recommended)

At the registrar or DNS provider that manages `iti.gr`, add or update:

| Type  | Name         | Value                 | TTL  |
|-------|--------------|-----------------------|------|
| CNAME | eos.iti.gr   | imanakos.github.io.   | 3600 |

Remove the existing A record for `eos.iti.gr` (`160.40.50.179`) to avoid conflicts.

### Option B — A records (alternative)

If CNAME is not available, add all four GitHub Pages A records:

| Type | Name       | Value           | TTL  |
|------|------------|-----------------|------|
| A    | eos.iti.gr | 185.199.108.153 | 3600 |
| A    | eos.iti.gr | 185.199.109.153 | 3600 |
| A    | eos.iti.gr | 185.199.110.153 | 3600 |
| A    | eos.iti.gr | 185.199.111.153 | 3600 |

Remove the existing A record (`160.40.50.179`) before adding these.

## Repository-side Status

The repository is fully configured for the custom domain:

- `artifacts/eos-website/public/CNAME` contains `eos.iti.gr` ✓
- GitHub Pages is configured to serve from the `gh-pages` branch ✓

**No further code changes are required.** Only the registrar DNS update is needed.

## Verification Steps (after DNS propagates — up to 48 hours)

1. Check propagation (CNAME option):
   ```
   curl -s "https://dns.google/resolve?name=eos.iti.gr&type=CNAME"
   # Should show: "data":"imanakos.github.io."
   ```

   Check propagation (A record option):
   ```
   curl -s "https://dns.google/resolve?name=eos.iti.gr&type=A"
   # Should show four answers with data: 185.199.108.153, .109, .110, .111
   ```

2. Confirm GitHub Pages DNS check:
   - Go to the GitHub repo → Settings → Pages
   - Verify "DNS check successful" is shown
   - Verify "Your site is published at https://eos.iti.gr" with HTTPS active

3. Open https://eos.iti.gr in a browser and confirm the site loads with a valid certificate.

## GitHub Pages IPs (reference)

`imanakos.github.io` currently resolves to:
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153
