import axios from "axios";

export const extractText = async (baseImage, setStatus, setOutputData) => {
  setStatus("loading");
  try {
    const extractedImage = await axios.post("/api/extractText", { baseImage });
    const { textAnnotations, fullTextAnnotation } =
      extractedImage.data.info.ocr.adv_ocr.data[0];
    setOutputData({
      type: "text",
      data: fullTextAnnotation.text || textAnnotations[0].description,
    });
    setStatus("");
  } catch (error) {
    setStatus("error");
  }
};

export const blurImage = async (baseImage, setStatus, setOutputData) => {
  setStatus("loading");
  try {
    const blurredImage = await axios.post("/api/blurImage", { baseImage });
    const url = /'(.+)'/.exec(blurredImage.data);
    setOutputData({
      type: "imgUrl",
      data: url[1],
    });
    setStatus("");
  } catch (error) {
    setStatus("error");
  }
};

export const addOverlay = async (
  baseImage,
  overlay,
  setStatus,
  setOutputData
) => {
  setStatus("loading");
  try {
    const overlayedImage = await axios.post("/api/addOverlay", {
      baseImage,
      overlay,
    });
    const url = /'(.+)'/.exec(overlayedImage.data);
    setOutputData({ type: "imgUrl", data: url[1] });
    setStatus("");
  } catch (error) {
    setStatus("error");
  }
};
