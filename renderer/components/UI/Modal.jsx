import ReactModal from "react-modal";

export default function Modal({
  children,
  className = "",
  onClose,
  visible,
  ...props
}) {
  return (
    <>
      <ReactModal
        className={`${className} outline-none rounded-xl bg-dark-100 text-light`}
        overlayClassName="fixed bg-opacity-80 inset-0 bg-dark flex items-center justify-center"
        closeTimeoutMS={300}
        isOpen={visible}
        onRequestClose={onClose}
        {...props}
      >
        {children}
      </ReactModal>
      <style global jsx>{`
        .ReactModal__Overlay {
          opacity: 0;
          transition: opacity 300ms ease-in-out;
        }

        .ReactModal__Overlay--after-open {
          opacity: 1;
        }

        .ReactModal__Overlay--before-close {
          opacity: 0;
        }
      `}</style>
    </>
  );
}
