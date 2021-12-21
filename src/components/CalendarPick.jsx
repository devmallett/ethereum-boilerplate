import React, { useState } from "react";
// import './App.css';
import { DatePicker, message, Alert } from "antd";
import "antd/dist/antd.css";
// import './index.css';
import styled from "styled-components";

/*
display:flex; flex-direction:row;

*/
const StyledInput = styled.input`
  display: block;
  width: 380px;
  height: 57px;
  margin: 20px 0px;
  border: 1px solid 708d81;
  border-radius: 40px;
`;
// Creating a custom hook
function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  function onChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange,
  };
}

function CalendarPick() {
  const inputProps = useInput();
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleBeginChange = (value) => {
    message.info(`Begin Date: ${value ? value.format("YYYY-MM-DD") : "None"}`);
    setBeginDate(value);
  };
  const handleEndChange = (value) => {
    message.info(`End Date: ${value ? value.format("YYYY-MM-DD") : "None"}`);
    setEndDate(value);
  };

  return (
    <div
      style={{
        marginTop: "350px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* <div> */}
      <div style={{ width: 400, margin: "50px auto" }}>
        {/* <div> */}
        <DatePicker
          style={{
            backgroundColor: "#708D81",
            borderRadius: "10px",
            width: "175px",
            height: "39px",
          }}
          onChange={handleBeginChange}
        />
        {/* <div style={{ marginTop: 16 }}> */}
        <div>
          Begin Date: {beginDate ? beginDate.format("MM-DD-YYYY") : "None"}
        </div>
        <div>
          <h1
            style={{
              color: "#F4D58D",
              margin: "10px",
            }}
          >
            Buy In
          </h1>
        </div>
        <div>
          <StyledInput {...inputProps} placeholder="E.g. 0.00115 ETH" />
          {/* <span>Value: {inputProps.value} </span> */}
        </div>
        <button
          style={{
            backgroundColor: "#E51C1C",
            borderRadius: "100px",
            width: "213.03px",
            height: "50px",
          }}
        >
          Start
        </button>
      </div>
      <div style={{ width: 400, margin: "50px auto" }}>
        {/* <div> */}
        <DatePicker
          style={{
            backgroundColor: "#708D81",
            borderRadius: "10px",
            width: "175px",
            height: "39px",
          }}
          onChange={handleEndChange}
        />
        {/* <div style={{ marginTop: 16 }}> */}
        <div>End Date: {endDate ? endDate.format("MM-DD-YYYY") : "None"}</div>
      </div>
    </div>
  );
}

export default CalendarPick;
