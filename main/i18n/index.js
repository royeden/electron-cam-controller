const i18n = require("i18next");
const i18nextBackend = require("i18next-node-fs-backend");
const { defaultLocale, locales } = require("../i18n.config");

const i18nInstance = i18n.createInstance();

const i18nextOptions = {
  backend: {
    // path where resources get loaded from
    loadPath: "./main/i18n/locales/{{lng}}/{{ns}}.json",

    // path to post missing resources
    addPath: "./main/i18n/locales/{{lng}}/{{ns}}.missing.json",

    // jsonIndent to use when storing json files
    jsonIndent: 2,
  },
  interpolation: {
    escapeValue: false,
  },
  saveMissing: true,
  fallbackLng: defaultLocale,
  whitelist: locales,
  react: {
    wait: false,
  },
};

i18nInstance.use(i18nextBackend);

// initialize if not already initialized
if (!i18nInstance.isInitialized) {
  i18nInstance.init(i18nextOptions);
}

module.exports = i18nInstance;
