export const DEFAULT_THEME = "autumn"; // "cupcake" // 'light'

export const APP_NAME = "Eating Desi";

export const APP_LOGO =
  "https://res.cloudinary.com/dlwhuhzzp/image/upload/v1695451828/logo_xmqamm.png";

export const CLOUD_NAME = "dlwhuhzzp";

export const CLOUD_BUCKET_NAME =
  process.env.REACT_APP_BACKEND_ENV === "live" ? "cuisine" : "cuisine";

export const CLOUDINARY_BASE_URL =
  process.env.REACT_APP_BACKEND_ENV === "live"
    ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`
    : `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
