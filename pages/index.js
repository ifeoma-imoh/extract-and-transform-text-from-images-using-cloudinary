import { useState, useRef } from "react";
import { extractText, blurImage, addOverlay } from "../util/axiosReq";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [baseImage, setBaseImage] = useState();
  const [outputData, setOutputData] = useState();
  const [status, setStatus] = useState();
  const [overlay, setOverlay] = useState();

  const baseFileRef = useRef();
  const overlayFileRef = useRef();

  const handleSelectImage = (e, setStateFn) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (e) {
      setStateFn(e.target.result);
    };
  };

  const handleExtractText = async () => {
    extractText(baseImage, setStatus, setOutputData);
  };

  const handleBlurImage = async () => {
    blurImage(baseImage, setStatus, setOutputData);
  };

  const handleAddOverlay = async () => {
    addOverlay(baseImage, overlay, setStatus, setOutputData);
  };

  const isBtnDisabled = !baseImage || status === "loading";

  return (
    <main className={styles.app}>
      <h1>Cloudinary OCR demo App</h1>
      <div>
        <div className={styles.input}>
          <div
            className={`${styles.image} ${styles.flex}`}
            onClick={() => baseFileRef.current.click()}
          >
            <input
              type="file"
              ref={baseFileRef}
              style={{ display: "none" }}
              onChange={(e) => handleSelectImage(e, setBaseImage)}
            />
            {baseImage ? (
              <img src={baseImage} alt="selected image" />
            ) : (
              <h2>Click to select image</h2>
            )}
            <div>
              <h2>Click to select image</h2>
            </div>
          </div>

          <div className={styles.actions}>
            <button onClick={handleExtractText} disabled={isBtnDisabled}>
              Extract text
            </button>
            <button onClick={handleBlurImage} disabled={isBtnDisabled}>
              Blur text content
            </button>

            <button
              onClick={handleAddOverlay}
              disabled={!overlay || isBtnDisabled}
            >
              Add overlay
            </button>
            <div
              className={`${styles.overlay} ${styles.flex}`}
              onClick={() => overlayFileRef.current.click()}
            >
              <input
                type="file"
                ref={overlayFileRef}
                onChange={(e) => handleSelectImage(e, setOverlay)}
                style={{ display: "none" }}
              />
              {overlay ? (
                <img src={overlay} alt="overlay" />
              ) : (
                <p>Click to select overlay</p>
              )}
              <div>
                <p>Click to select overlay</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.output}>
          {status ? (
            <h4>{status}</h4>
          ) : (
            outputData &&
            (outputData.type === "text" ? (
              <div>
                <span>{outputData.data}</span>
              </div>
            ) : (
              <img src={outputData.data} alt="" />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
