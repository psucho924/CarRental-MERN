import { toast } from "react-hot-toast";

export const wrapAsync = (asyncFunction) => {
  return async (...args) => {
    try {
      return await asyncFunction(...args);
    } catch (error) {
      console.error(error);
      toast(error.message);
    }
  };
};
