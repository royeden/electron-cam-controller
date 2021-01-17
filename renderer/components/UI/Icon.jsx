import {
  MdAdd,
  MdAddCircle,
  MdAddCircleOutline,
  MdClose,
  MdEdit,
  MdRedo,
  MdRemove,
  MdRemoveCircle,
  MdRemoveCircleOutline,
  MdSave,
  MdUndo,
} from "react-icons/md";

const ICON_MAP = {
  add: MdAdd,
  "add-circle": MdAddCircle,
  "add-outline": MdAddCircleOutline,
  close: MdClose,
  edit: MdEdit,
  redo: MdRedo,
  remove: MdRemove,
  "remove-circle": MdRemoveCircle,
  "remove-outline": MdRemoveCircleOutline,
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
      className={className}
      title={title}
      role="img"
      aria-label={aria_label}
    >
      <MappedIcon {...props} />
    </span>
  );
}
