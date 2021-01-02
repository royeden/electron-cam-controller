import { I18nextProvider } from "react-i18next";
import { useEffect, useRef } from "react";

import Loader from "../components/Loader";
import useToggle from "../lib/hooks/useToggle";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }) {
  const i18nRef = useRef(null);
  const [loaded, toggleLoaded] = useToggle();
  useEffect(() => {
    if (process.browser) {
      const i18n = window.i18n;
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
      <Component {...pageProps} />
    </I18nextProvider>
  ) : (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader />
    </div>
  );
}

export default MyApp;
