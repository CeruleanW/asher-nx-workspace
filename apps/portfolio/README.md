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

The site reads `public/data/personal-data.yaml` and `public/data/projects.json`,
so running it locally does not require Firebase credentials.

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
