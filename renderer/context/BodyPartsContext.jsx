import { createContext, useState } from "react";
import { BODY_PARTS_ROUTES } from "../constants/posenet";
import useObjectState from "../lib/hooks/useObjectState";

const initialContext = {
  bodyParts: BODY_PARTS_ROUTES,
  setBodyParts(bodyParts = {}) {},
  mergeBodyParts(bodyParts = {}) {},
  editingPart: "",
  setEditingPart(partName = "") {},
};

export const BodyPartsContext = createContext(initialContext);

const { Provider } = BodyPartsContext;

export default function BodyPartsProvider({ children, ...props }) {
  const [editingPart, setEditingPart] = useState(initialContext.editingPart);
  const [
    bodyParts,
    { set: setBodyParts, merge: mergeBodyParts },
  ] = useObjectState(initialContext.bodyParts);
  return (
    <Provider
      value={{
        bodyParts,
        setBodyParts,
        mergeBodyParts,
        editingPart,
        setEditingPart,
      }}
    >
      {children}
    </Provider>
  );
}
