const cloudinary = require("cloudinary").v2;
const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "uploads",
//     allowed_formats: ["jpg", "jpeg", "png"],
//   },
// });
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
module.exports = { cloudinary, upload };
