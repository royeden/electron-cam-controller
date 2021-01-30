import Tippy from "@tippyjs/react";
import { useContext } from "react";

import { RoutesContext } from "../../context/RoutesContext";
import useTranslation from "../../lib/hooks/useTranslation";

export default function EditBodyPart({
  bodyPart,
  className = "",
  placement = "top",
}) {
  const { t } = useTranslation();
  const { setEditingRoute } = useContext(RoutesContext);
  return (
    <div className={`${className} h-full w-full`}>
      <Tippy
        animation="shift-away"
        arrow
        className="w-full h-full outline-none focus:outline-none"
        content={t(`routes.${bodyPart}`)}
        placement={placement}
      >
        <button
          className="w-2 h-2 transition-all duration-300 ease-in-out transform scale-150 rounded-full outline-none focus:outline-none hover:bg-pallete-complimentary focus:bg-pallete-complimentary hover:scale-225 focus:scale-225 bg-pallete-triadic2"
          onClick={() => setEditingRoute(bodyPart)}
        ></button>
      </Tippy>
    </div>
  );
}