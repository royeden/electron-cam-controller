import {
  MdAdd,
  MdAddCircle,
  MdAddCircleOutline,
  MdAutorenew,
  MdClose,
  MdContentCopy,
  MdDelete,
  MdEdit,
  MdRedo,
  MdRemove,
  MdRemoveCircle,
  MdRemoveCircleOutline,
  MdSave,
  MdUndo,
} from "react-icons/md";
import { classnames } from "tailwindcss-classnames";

const ICON_MAP = {
  add: MdAdd,
  "add-circle": MdAddCircle,
  "add-outline": MdAddCircleOutline,
  close: MdClose,
  copy: MdContentCopy,
  delete: MdDelete,
  edit: MdEdit,
  redo: MdRedo,
  remove: MdRemove,
  "remove-circle": MdRemoveCircle,
  "remove-outline": MdRemoveCircleOutline,
  reset: MdAutorenew,
  save: MdSave,
  undo: MdUndo,
};

export default function Icon({
  "aria-label": aria_label,
  className = "",
  title = "",
  type = "",
  ...props
}) {
  const MappedIcon = ICON_MAP[type];
  return (
    <span
      className={classnames(className, "block")}
      title={title}
      role="img"
      aria-label={aria_label}
    >
      <MappedIcon className="w-full h-full" {...props} />
    </span>
  );
}
