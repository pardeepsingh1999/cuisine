import { CLOUDINARY_BASE_URL } from "../config";

/**
 * api call "https://api.cloudinary.com/v1_1/{cloudName}/image/upload"
 * upload image on cloudinary
 * and get image url (res.url)
 *
 * @param {Object} formData - form data object in which file is compulsory
 * @returns {Object} - return the object of uploaded image on cloud
 */
export const uploadImageOnCloudinary = (formData) => {
  return new Promise((resolve, reject) => {
    fetch(CLOUDINARY_BASE_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};
