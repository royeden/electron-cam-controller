import rosetta from "rosetta";
import { createContext, useEffect, useRef } from "react";

import { defaultLocale } from "../../main/i18n/config";
import translations from "../i18n/translations";
import useToggle from "../lib/hooks/useToggle";
import Loader from "../components/UI/Loader";
import I18N_EVENTS from "../../main/events/i18n";
import CONFIG_EVENTS from "../../main/events/config";

const i18n = rosetta(translations);

export const i18nContext = createContext({
  activeLocale: defaultLocale,
  t: (...args) => i18n.t(...args),
  locale: (l, dict) => {
    i18n.locale(l);
    if (dict) {
      i18n.set(l, dict);
    }
  },
  loaded: false,
});

const { Provider } = i18nContext;

export default function I18nProvider({ children }) {
  const activeLocaleRef = useRef(defaultLocale);
  const [loaded, toggleLoaded] = useToggle();
  const [, toggleTick] = useToggle();

  const i18nWrapper = {
    activeLocale: activeLocaleRef.current,
    t: (...args) => i18n.t(...args),
    locale: (l, dict) => {
      activeLocaleRef.current = l;
      i18n.locale(l);
      if (dict) {
        i18n.set(l, dict);
      }
      // force rerender to update view
      toggleTick();
    },
  };

  useEffect(() => {
    if (process.browser) {
      window.ipcRenderer.on(I18N_EVENTS.changeLanguage, (event, language) => {
        i18nWrapper.locale(language);
      });
      const language = window.ipcRenderer.sendSync(
        I18N_EVENTS.getInitialLanguage
      );
      i18nWrapper.locale(language || defaultLocale);
      if (!loaded) {
        window.ipcRenderer.send(CONFIG_EVENTS.loaded);
        toggleLoaded();
      } else {
        return () => {
          window.addEventListener("beforeUnload", () =>
            window.ipcRenderer.send(CONFIG_EVENTS.loading)
          );
        };
      }
    }
  }, [loaded]);

  return loaded ? (
    <Provider value={{ ...i18nWrapper, loaded }}>{children}</Provider>
  ) : (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader />
    </div>
  );
}
