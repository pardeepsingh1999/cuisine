import toast from "react-hot-toast";
import moment from "moment";

export const showToast = (message, type = "error", duration = 4000) => {
  toast.dismiss();

  toast[type](message, { duration });
};

export const errorHandler = (error) => {
  console.log("error>>", error);
  showToast(
    error?.reason?.length || error?.message?.length
      ? error?.reason || error?.message
      : "Something went wrong, Try again after some time."
  );
};

export const formatDate = (date, isHideSameYear = false) => {
  if (!date) return "";

  if (isHideSameYear && moment().isSame(date, "year")) {
    return moment(date).format("MMM DD");
  } else {
    return moment(date).format("MMM DD, YYYY");
  }
};
