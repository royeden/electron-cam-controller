import { classnames } from "tailwindcss-classnames";
import { useUIDSeed } from "react-uid";

export default function Toggle({
  checked,
  children,
  defaultValue = false,
  disabled = false,
  onChange,
  ...props
}) {
  const seed = useUIDSeed();
  const id = seed("toggle");
  
  return (
    <div className={classnames("flex", "items-center")}>
      <button
        aria-pressed={checked}
        className={classnames(
          "duration-300",
          "ease-in-out",
          "h-6",
          "mr-2",
          "px-1",
          "rounded-xl",
          "transition-colors",
          "w-10",
          {
            "bg-light-medium": !checked,
            "bg-secondary": checked,
            "opacity-70": disabled
          }
        )}
        disabled={disabled}
        onClick={() => onChange()}
        type="button"
      >
        <span
          className={classnames(
            "bg-light",
            "block",
            "duration-300",
            "ease-in-out",
            "h-4",
            "rounded-full",
            "transform",
            "transition-transform",
            "w-4",
            {
              "translate-x-full": checked
            }
          )}
        ></span>
      </button>
      <input
        className="hidden"
        checked={checked}
        disabled={disabled}
        onChange={() => onChange()}
        id={id}
        type="checkbox"
      />
      <label className="cursor-pointer" htmlFor={id}>{children}</label>
    </div>
  );
}
