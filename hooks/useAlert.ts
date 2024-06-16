import { toast } from "react-toastify";

type UseAlertType = [(type: string, message: string) => void];

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

  return [showAlert];
};
