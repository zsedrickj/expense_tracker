import { useContext } from "react";
import { ModalContext } from "@/app/(protected)/ModalContext"; // adjust path kung nasaan ang ModalContext

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};
