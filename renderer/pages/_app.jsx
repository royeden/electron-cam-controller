import ReactModal from "react-modal";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { useEffect, useRef } from "react";
import "tippy.js/dist/tippy.css"; // optional
import "tippy.js/animations/shift-away.css";

import BodyPartsProvider from "../context/BodyPartsContext";
import Loader from "../components/Loader";
import useToggle from "../lib/hooks/useToggle";
import { defaultLocale, locales } from "../../main/i18n.config";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }) {
  const i18nRef = useRef(null);
  const [loaded, toggleLoaded] = useToggle();
  useEffect(() => {
    if (process.browser) {
      ReactModal.setAppElement("#__next");
      const i18n = window.i18n;
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

      i18n.use(initReactI18next);

      // initialize if not already initialized
      if (!i18n.isInitialized) {
        i18n.init(i18nextOptions);
      }

      window.ipcRenderer.on("language-changed", (event, message) => {
        i18n.addResourceBundle(
          message.language,
          message.namespace,
          message.resource,
          true,
          true
        );
        i18n.changeLanguage(message.language);
      });
      i18n.changeLanguage("en");
      window.ipcRenderer.send("get-initial-language");
      i18nRef.current = i18n;
      toggleLoaded();
    }
  }, []);
  return loaded ? (
    <I18nextProvider i18n={i18nRef.current}>
      <BodyPartsProvider>
        <Component {...pageProps} />
      </BodyPartsProvider>
    </I18nextProvider>
  ) : (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader />
    </div>
  );
}

export default MyApp;
