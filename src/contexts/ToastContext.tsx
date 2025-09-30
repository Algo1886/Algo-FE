import { createContext, useContext, useState, type ReactNode } from "react";
import * as Toast from "@radix-ui/react-toast";

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast.Provider duration={2000} swipeDirection="right" swipeThreshold={100}>
        <Toast.Root
          open={toastOpen}
          onOpenChange={setToastOpen}
          className="bg-white text-black border border-gray-300 px-4 py-2 rounded shadow"
        >
            <Toast.Title className="flex flex-row items-center gap-2">
              {toastMessage === "풀이가 북마크되었어요!" && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3L4.5 8.5L2 6"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
              {toastMessage}
            </Toast.Title>
        </Toast.Root>
        <Toast.Viewport className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col gap-2 p-4 z-50" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};