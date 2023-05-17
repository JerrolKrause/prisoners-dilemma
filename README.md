# Angular Starter

A rapid starter project for creating Angular single page apps. Contains Angular, ngPrime, Akita and more. Built with Angular CLI.

## Quick Start

```bash
# Open a terminal/command and navigate to the directory where the starter is needed

# Clone the latest
git clone https://github.com/ntersol/angular-starter.git

# Rename the directory
ren angular-starter MY_APP_NAME

# Navigate into the newly renamed directory
cd MY_APP_NAME

# Install the repo with npm
npm i

# Start the app
ng serve
```

## Usage

```bash
# Serve dev on http://localhost:4200/
ng serve

# Serve dev on http://localhost:4200/ with hot module reloading
npm run start

# Prod Build for targeted environment. Files will appear in the dist folder
npm run build:qa # Uses settings from environment.qa.ts
npm run build:uat # Uses settings from environment.uat.ts
npm run build:prod # Uses settings from environment.prod.ts

# Serve prod build from dist folder at http://127.0.0.1:8080/#/.
# Requires http server which can be installed with `npm install http-server -g`
npm run prod

# Run prettier which will format the code in the entire project. It is better to use the prettier extension which formats on save.
npm run format

# Run prod build and then use webpack bundle analyzer to check bundle sizes and composition
# Documentation located in /documentation/
npm run build:stats

# Automatically generate documentation
npm run docs

# Run e2e protractor tests
ng e2e

# Run e2e protractor tests without rebuilding every time (faster)
ng e2e --s false

# Update NPM dependencies via Angular CLI
ng update

# Deploy dist folder to git pages. Be sure to update deploy script in package.json
npm run deploy

# Deploy dist folder to git pages with prerendered pages
1. Add "baseHref": "/angular-starter/", to angular.json in projects>angular-starter>architect>build>options
2. Run "npm run deploy:ssr"
3. Remove update from #1. Prerender does not (yet) support the --base-href prop in the build command

# Angular Universal/SSR Commands
npm run ssr:dev # Run SSR locally for development purposes
npm run ssr:build # Create an SSR prod build
npm run ssr:serve # Serve SSR prod build with express. This is the command needed to run on the server.

```

## Localizing Your App

`package.json`

- If using github pages, update the `npm run deploy` command in this file to include the correct slug. IE replace `/angular-starter/` with your url

`src > environments > defaults.ts` +
`src > environments > environment.prod.ts`

- Localize environment settings and properties in these files. Enable/disable app functionality as needed

`src > app > shared > app.settings.ts`

- Add/change global app & environment variables

`src > index.html`

- Update any header changes to the html in this file. IE logo, navigation, etc

`src > manifest.json`

- Change the site info in this file to be specific to your app. Make sure the start Url property matches your production URL

`src > assets > icons`

- Change these icons to ones for your app

`src >` `apple-touch-icon` + `favicon.ico` + `safari-pinned-tab.svg`

- Change these icons to ones for your app

`src > ngsw-config.json`

- Update any dependencies needed for the service worker. Use asset groups for site resources & use dataGroups for API calls

## Useful Tools

### VSCode Tools

- Prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- ESLint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

## Useful Info

Lazy load libraries. Normally libraries that are shared between lazy loaded routes are all bundled into a single master bundle. This approach will bundle them separately.

See https://github.com/ntersol/angular-starter/blob/main/src/app/components/components.lazy.ts for how to lazy load both internal components/modules and 3rd party libraries.
