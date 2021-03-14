import { useContext } from "react";
import { i18nContext } from "../../context/I18nContext";

export default function useTranslation() {
  const i18n = useContext(i18nContext);
  return i18n;
}
