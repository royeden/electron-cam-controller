import Tippy from "@tippyjs/react";

import Icon from "./Icon";

export default function IconButton({
  button = {},
  disabled = false,
  onClick,
  tippy = {},
  title = "",
  type = "",
  ...props
}) {
  return (
    <Tippy
      animation="shift-away"
      placement="top"
      popperOptions={{
        strategy: "fixed",
      }}
      {...tippy}
      content={title}
    >
      <button type="button" {...button} disabled={disabled} onClick={onClick}>
        <Icon {...props} type={type} />
      </button>
    </Tippy>
  );
}
