import { toast } from "react-toastify";

export const successToaster = (text: string) => {
  toast.success(text);
};

export const errorToaster = (text: string) => {
  toast.error(text);
};
