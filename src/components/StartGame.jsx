import React from "react";
import PhotoUploader from "./PhotoUploader";
import CalendarPicker from "./CalendarPick";

const StartGame = () => {
  return (
    <div
      style={{
        backgroundColor: "#001427",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <PhotoUploader />
      <CalendarPicker />
    </div>
  );
};

export default StartGame;
