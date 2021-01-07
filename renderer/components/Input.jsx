import { classnames } from "tailwindcss-classnames";

export default function Input({
  className = "",
  error = "",
  onChange,
  type,
  value,
  ...props
}) {
  return (
    <input
      {...props}
      className={classnames(
        "w-32",
        "p-2",
        "transition-colors",
        "duration-300",
        "ease-in-out",
        "border-2",
        "rounded-md",
        "text-light-high",
        "hover:text-light",
        "focus:text-light",
        "bg-dark",
        "hover:bg-dark-100",
        "border-dark",
        "outline-none",
        {
          ...(className ? { [className]: true } : {}),
          [classnames(
            "hover:border-white",
            "focus:border-white",
          )]: !error,
          [classnames(
            "border-pallete-error",
            "hover:border-pallete-complimentary",
            "focus:border-pallete-complimentary",
          )]: error,
        }
      )}
      onChange={onChange}
      type={type}
      value={value}
    />
  );
}
