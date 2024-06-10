import { ReactElement } from "react";
import { ToastContainer, toast } from "react-toastify";

type UseAlertType = [
  (type: string, message: string) => void,
  () => ReactElement
];

export const useAlert = (): UseAlertType => {
  const showAlert = (type: string, message: string) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else if (type === "warning") {
      toast.warning(message);
    } else if (type === "info") {
      toast.info(message);
    }
  };
  const Alert = () => <ToastContainer />;

  return [showAlert, Alert];
};
