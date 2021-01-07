import { MdAdd, MdClose } from "react-icons/md";

const ICON_MAP = {
  add: MdAdd,
  close: MdClose,
};

export default function Icon({
  "aria-label": aria_label,
  className = "",
  title = "",
  type = "",
  ...props
}) {
  const MappedIcon = ICON_MAP[type] || "?";
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
