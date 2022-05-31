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
      { folder: "ocr-demo" },
      async function (error, result) {
        const response = await cloudinary.image(`${result.public_id}.jpg`, {
          effect: "blur_region:2000",
          gravity: "ocr_text",
          sign_url: true,
        });
        res.status(200).json(response);
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
