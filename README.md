# ReviveCare Physiotherapy — website + admin portal

A physiotherapy clinic website and a login-protected admin portal, both running on Cloudflare Workers.
All names, phone numbers, addresses and reviews are **sample content** until the customer's real details are entered in the admin portal.

| | URL |
|---|---|
| Website | https://physio-site.digibillmate-onboarding.workers.dev |
| Admin portal | https://physio-admin.digibillmate-onboarding.workers.dev |

The live admin login is in `admin-credentials-live.local.txt`. That file is not committed to git. Change the password from **Account** after the first login.

## What's inside

```
site/       Public website worker (pages are built on Cloudflare's servers from the database)
admin/      Admin portal worker (JSON API + single-page app in admin/public)
shared/     Content model (schema.js) and icons shared by both
db/         Database migrations and sample content (seed-data.js)
scripts/    build-seed.mjs (sample content → SQL), create-admin.mjs (admin login)
```

Cloudflare resources (account `digibillmate.onboarding@gmail.com`):

- Worker `physio-site`: the public website
- Worker `physio-admin`: the admin portal
- D1 database `physio-db`: settings, content, appointment requests, admin users
- KV namespace `physio-media`: uploaded images, served at `/media/<id>` by both workers

## What the admin portal can edit

- **Appointments**: booking requests from the website. Each can be given a status (new, contacted, booked, completed, cancelled) and private notes, and the list can be exported to CSV.
- **Website content**: services, conditions, recovery steps, why-choose-us points, team, reviews, FAQs, gallery, blog posts and branches. Items can be added, edited, reordered or hidden.
- **Settings**: clinic details and logo, contact details and hours, social links, the home banner, headline numbers, section titles, about and founder, the booking form, footer, colours and search/launch options.
- **Photos & images**: upload images (JPG, PNG, WebP, GIF, AVIF; 5 MB each) and pick them from any image field.

### Before going live
The admin dashboard has a launch checklist. The main items are:
1. Replace the sample clinic details, team, reviews and photos.
2. Under **Search & launch**, turn off *Hide website from Google* and *Show "preview" banner*.
3. Optionally add a custom domain to `physio-site`. Go to Cloudflare dashboard → Workers → physio-site → Settings → Domains & Routes, then update `SITE_URL` in `admin/wrangler.jsonc` and redeploy the admin portal.

## Local development

Requires Node 18+ and Wrangler 4 (`npm i -g wrangler`).

```bash
npm run db:migrate:local      # create tables in the local database
npm run db:seed:local         # load sample content (replaces all content)
npm run admin:create:local    # local admin login → admin-credentials.local.txt
npm run dev:site              # http://127.0.0.1:8787
npm run dev:admin             # http://127.0.0.1:8788
```

Both dev servers share the local database in `.wrangler-local/`.

## Deploying

```bash
npm run deploy                # deploys site, then admin
npm run db:migrate:remote     # only when a new migration is added to db/migrations
```

`npm run db:seed:remote` **replaces all live content** with the sample data. Do not run it once the customer has started editing.
`npm run admin:create:remote` resets the live `admin` password and writes it to `admin-credentials-live.local.txt`.

## Adding a new field or section

Add the field to `shared/schema.js`. The admin form updates automatically. Then use the value in the matching template under `site/src/views/`.

## Notes

- Admin passwords use PBKDF2-SHA256 with 20,000 iterations, which fits the Workers free-plan CPU limit. Logins are limited to 10 failed attempts per IP every 15 minutes. On a paid Workers plan the iteration count in `admin/src/auth.js` can be raised, and existing passwords keep working.
- The booking form has a hidden spam trap and allows at most 5 requests per IP per hour.
- Placeholder visuals are built-in illustrations. Uploaded photos replace them automatically.
