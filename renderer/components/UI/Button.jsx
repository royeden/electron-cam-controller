export default function Button({ children, className = "", disabled = false, onClick, ...props }) {
  return (
    <button
      className="px-5 py-2 tracking-wide uppercase transition-colors duration-300 ease-in-out rounded-md text-dark bg-secondary-dark focus:bg-secondary hover:bg-secondary shadow-light-md text-bold whitespace-nowrap"
      disabled={disabled}
      onClick={onClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
