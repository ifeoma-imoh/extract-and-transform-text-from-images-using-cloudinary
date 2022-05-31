const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export default async function handler(req, res) {
  const { baseImage } = req.body;
  try {
    await cloudinary.uploader.upload(
      baseImage,
      {
        ocr: "adv_ocr",
        folder: "ocr-demo",
      },
      async function (error, result) {
        res.status(200).json(result);
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};
