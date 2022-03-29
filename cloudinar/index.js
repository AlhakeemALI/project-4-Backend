const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUNDINARARY_NAME,
  api_key: process.env.CLOUNDINARARY_API_KEY,
  api_secret: process.env.SECRET_CLOUDINARARY,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Home",
    allwoedFoemats: ["jpeg", "png", "jpg"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
