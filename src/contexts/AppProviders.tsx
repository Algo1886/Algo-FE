import { type ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { ConfirmProvider } from "./ConfirmContext";
import { ToastProvider } from "./ToastContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ConfirmProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ConfirmProvider>
    </AuthProvider>
  );
};