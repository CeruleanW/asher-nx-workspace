<!-- ![Logo of the project](./public/android-chrome-192x192.png) -->

# Asher Yang's Portfolio

> This is my portfolio. Nothing else.

## Run locally

From the workspace root:

```sh
yarn install --frozen-lockfile
yarn start:portfolio
```

The development server uses port 3000 by default. Set `PORT` to choose another
port. Build the production site with `yarn build:portfolio`; output is written
to `dist/apps/portfolio`.

The portfolio requires sign-in to view. Personal data is fetched from a private
Supabase Storage bucket; project data remains a public static file at
`public/data/projects.json`.

### Configure private personal data

1. Create a Supabase project and a **private** Storage bucket named
   `personal-data`.
2. Create your Supabase Auth user and add its UUID in
   `supabase/storage-policy.sql`; run that policy in the SQL editor. It grants
   read access only to that user and grants no browser write access.
3. Upload `personal-data.yaml` to the bucket. Keep service-role keys private;
   the portfolio only uses the publishable/anon key and a user's Auth session.
4. Copy `.env.example` to `.env` and fill in the project URL and publishable
   (or legacy anon) key. These `REACT_APP_` values are public by design; the
   bucket policy is what protects the file.

The old server application has been removed. Its sample payloads are archived
under the workspace-level `archive/personal-data-server-data` directory. The
portfolio YAML source is kept locally under `apps/portfolio/private-data/`
and ignored by Git; upload it to the private bucket before deleting the local
copy. The old public YAML path is no longer served. Note that files and values
committed in earlier Git history cannot be made private by this change; rotate
any credentials or secrets that may have been included there.

### Dependencies on an external filesystem

If the workspace is on a filesystem such as exFAT that cannot support the
usual dependency links, install dependencies on a Linux filesystem instead:

```sh
export YARN_MODULES_FOLDER=/tmp/opencode/portfolio-runtime/node_modules
yarn install --frozen-lockfile --ignore-engines --modules-folder "$YARN_MODULES_FOLDER"
yarn start:portfolio
```

Keep `YARN_MODULES_FOLDER` set when running or building the app. The portfolio
launcher and CRACO configuration use it for executable, package, and
TypeScript resolution. The directory in this example is temporary; reinstall
dependencies if it is removed.

## Pages

* Home
* Projects
  * My main projects will be shown here.
* About Me
* Contact
  * The form in this page will send a request to my email service API serverd by Express.js on Heroku. Once a valid request is received, an email will be sent to my work email address.
* Resume

## Links

* Project homepage: <https://yiyangdev.me/>
* Repository: <https://github.com/CeruleanW/MyPortfolio/>
* Issue tracker: <https://github.com/CeruleanW/MyPortfolio/issues>
  * In case of sensitive bugs like security vulnerabilities, please contact ashery.tech@gmail.com directly instead of using issue tracker. We value your effort to improve the security and privacy of this project!
* Related projects:
  * https://github.com/CeruleanW/idea-dropper
  * <https://github.com/CeruleanW/google-photos-search-enhancer>
  * <https://github.com/CeruleanW/church-eduction-website>
  * https://github.com/CeruleanW/landing-page-example
  * <https://github.com/CeruleanW/Broken-dream-cafe>

## Credits

* Material UI
* Framer motion
* Pure React Carousel
* React Router
* Sass
* React share
* React Hook Form

## Licensing

The code in this project is licensed under MIT license.
