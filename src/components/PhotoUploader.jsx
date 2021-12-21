import React, { useState } from "react";
// import './App.css';
import "antd/dist/antd.css";
import "../index.css";

// const styles = {

//     photoContainer: {
//         display: "grid",
//         grid_template_rows: "1fr auto",
//         maxWidth: "80rem",
//         minHeight: "100vh",
//         padding: "0 2rem",
//         margin: "0 auto",
//         backgroundColor: "#001427"
//     },

//     photoMain: {
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "center",
//         padding: "2rem 0",
//     },

//     photoTitle: {
//         margin: "0",
//         lineHeight: "1.15",
//         fontSize: "4rem",
//     },

//     photoDescription: {
//         margin: "4rem 0",
//         lineHeight: "1.5",
//         fontSize: "1.5rem",
//     },

//     photoForm: {

//         fontSize: "1em",
//         padding: "10em 10em 5em 5em",
//         border: "dotted 15px #708d81",
//         borderRadius: "0.5em",
//     },

//     formButton: {
//         width: "215px",
//         backgroundColor: "blueviolet"
//     },

//     photoButton: {
//         color: "white",
//         fontSize: "1em",
//         backgroundColor: "blueviolet",
//         padding: "0.5em 0.8em",
//         border: "none",
//         borderRadius: "0.2em",
//     },

//     photoCode: {
//         textAlign: "left",
//     },

// }

export default function PhotoUploader() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
    console.log("This was");
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault();
    console.log(event.currentTarget);
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    console.log(fileInput);

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "dam-uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dtx4hus2o/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    console.log("data", data);

    setImageSrc(data.secure_url);
    setUploadData(data);
  }
  return (
    <div className="photoContainer">
      <main className="photoMain">
        <p className="photoDescription">Upload your image to Cloudinary!</p>

        <form
          className="photoForm"
          method="post"
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
        >
          <p>
            {/* <input style={{ background: "red" }} type="file" name="file" /> */}
            <div
              style={{
                width: "213.03px",
                height: "50px",
                padding: "5px 10px 35px 10px",
                background: "#E51C1C",
                border: "1px solid #E51C1C",
                position: "relative",
                color: "#fff",
                // borderRadius: "2px",
                textAlign: "center",
                float: "left",
                cursor: "pointer",
                borderRadius: "100px",
              }}
            >
              Choose File
              <input
                type="file"
                style={{
                  position: "absolute",
                  zIndex: "1000",
                  opacity: "0",
                  cursor: "pointer",
                  right: "0",
                  top: "0",
                  height: "100%",
                  fontSize: "24px",
                  width: "100%",
                }}
              />
            </div>
          </p>

          <img src={imageSrc} alt="this is an uplaod" />

          {imageSrc && !uploadData && (
            <p>
              <button className="photoButton">Upload Files</button>
            </p>
          )}

          {uploadData && (
            <code>
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )}
        </form>
      </main>
    </div>
  );
}
