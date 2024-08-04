import { createContext, useEffect, useState } from "react";
import "./uploadWidget.scss";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function UploadWidget({ uwConfig, setState }) {
  const [widget, setWidget] = useState(null);

  useEffect(() => {
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.id = "uw";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load script"));
        document.body.appendChild(script);
      });
    };

    if (!document.getElementById("uw")) {
      loadScript()
        .then(() => {
          initializeWidget();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      initializeWidget();
    }
  }, []);

  const initializeWidget = () => {
    if (window.cloudinary) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setState((prev) => [...prev, result.info.secure_url]);
          }
        }
      );
      setWidget(myWidget);
    } else {
      console.error("Cloudinary script is not loaded yet");
    }
  };

  const handleUploadClick = () => {
    if (widget) {
      widget.open();
    } else {
      console.error("Cloudinary Widget is not ready");
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ widget }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={handleUploadClick}
      >
        Tải lên
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
