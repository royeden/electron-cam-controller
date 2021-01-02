const i18n = require("i18next");
const { defaultLocale, locales } = require("../i18n.config");
const initReactI18next = require("react-i18next").initReactI18next;

const i18nInstance = i18n.createInstance();

const i18nextOptions = {
  interpolation: {
    escapeValue: false,
  },
  saveMissing: true,
  lng: "en",
  fallbackLng: defaultLocale,
  whitelist: locales,
  react: {
    useSuspense: false,
  },
};

i18nInstance.use(initReactI18next);

// initialize if not already initialized
if (!i18nInstance.isInitialized) {
  i18nInstance.init(i18nextOptions);
}

module.exports = i18nInstance;
