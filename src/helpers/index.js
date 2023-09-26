import toast from "react-hot-toast";

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
