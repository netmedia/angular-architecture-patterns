var fs = require('fs-extra');
var jsonConcat = require("json-concat");

var localizationSourceFilesEN = [
  "./i18n/general.en.json",
  "./i18n/auth.en.json",
  "./i18n/products.en.json",
  "./i18n/components.en.json"
];

var localizationSourceFilesHR = [
  "./i18n/general.hr.json",
  "./i18n/auth.hr.json",
  "./i18n/products.hr.json",
  "./i18n/components.hr.json"
];

function mergeAndSaveJsonFiles(src, dest) {
  jsonConcat({ src: src, dest: dest },
    function (res) {
      console.log('Localization files successfully merged!');
    }
  );
}

function setEnvironment(configPath, environment) {
  fs.writeJson(configPath, {env: environment},
    function (res) {
      console.log('Environment variable set to ' + environment)
    }
  );
}

// Set environment variable to "development"
setEnvironment('./config/env.json', 'development');

// Merge all localization files into one
mergeAndSaveJsonFiles(localizationSourceFilesEN, "./i18n/en.json");
mergeAndSaveJsonFiles(localizationSourceFilesHR, "./i18n/hr.json");