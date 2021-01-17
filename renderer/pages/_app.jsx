import ReactModal from "react-modal";
import { useEffect } from "react";
import "tippy.js/dist/tippy.css"; // optional
import "tippy.js/animations/shift-away.css";

import "../styles/tailwind.css";
import I18nProvider from "../context/I18nContext";
import RoutesProvider from "../context/RoutesContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (process.browser) {
      ReactModal.setAppElement("#__next");
    }
  }, []);
  return (
    <I18nProvider>
      <RoutesProvider>
        <Component {...pageProps} />
      </RoutesProvider>
    </I18nProvider>
  );
}

export default MyApp;
