import React from "react";
import useEscapeKey from "../../hooks/use-escape-key";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]); // [ { id, message, variant }
  const dismissAllToasts = React.useCallback(() => setToasts([]), []);

  function addToast({ message, variant }) {
    const newToast = {
      id: crypto.randomUUID(),
      message,
      variant,
    };
    setToasts([...toasts, newToast]);
  }

  function dismissToast(id) {
    setToasts(toasts.filter((toast) => toast.id !== id));
  }

  useEscapeKey(dismissAllToasts);

  return (
    <ToastContext.Provider value={{ toasts, addToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
