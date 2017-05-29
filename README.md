Angular architecture patterns
=============================

This application represents a demo project for **Angular architecture patterns** blog series at [http://netmedia.io](http://netmedia.io/blog/angular-architecture-patterns-high-level-project-architecture_5589).
Frontend app is generated with [Angular CLI](https://github.com/angular/angular-cli). It uses it's own local dev server on `http://localhost:4200/`.

### Installation
```
git clone https://github.com/anteburazer/angular-architecture-patterns.git
cd angular-architecture-patterns
npm install
npm run start
```


### Run Development
Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
The command will run custom hooks which will set environment to development and merge all i18n files needed for multi language support. The application uses proxy file to connect with the API. Proxy settings are defined in `proxy.conf.json`


### Build for production
Run `npm run sy-build` to build the application for production which includes tree shaking, AOT and other cool stuff for minification.
This command is defined in `package.json` file under the scripts section and includes regular Angular CLI build command, custom made hooks and generation of service worker file.


When application is built for production it's copied in `/dist` folder which is the public folder for **Angular CLI**.


### Hooks
Hooks are located in `/hooks` folder and they are responsible for merging and copying configuration and localization files for development and production.

#### Note
Copying files is not necessary on angular-cli v1.0.4 and above because it has built in login for this action. You just need to specify which files/folders need to be copied into your destination folder (default `dist`) and you can do that in `.angular-cli.json` file by specifing the assets array:

```
"assets": [
  "assets",
  "favicon.ico",
  "service-worker.js",
  { "glob": "**/*", "input": "../config", "output": "./config/" },
  { "glob": "en.json", "input": "../i18n", "output": "./i18n/" },
  { "glob": "hr.json", "input": "../i18n", "output": "./i18n/" }
]
```