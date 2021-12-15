import React, { useState } from 'react';
// import './App.css';
import { DatePicker, message, Alert } from 'antd';
import 'antd/dist/antd.css';
// import './index.css';
import styled from 'styled-components'

/*
display:flex; flex-direction:row;

*/
const StyledInput = styled.input`
  display: block;
  margin: 20px 0px;
  border: 1px solid lightblue;
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
    const handleBeginChange = value => {
        message.info(`Begin Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
        setBeginDate(value);
    };
    const handleEndChange = value => {
        message.info(`End Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
        setEndDate(value);
    };

    return (
        <div style={{ display: 'flex', flexDirection: "row" }}>
            <div style={{ width: 400, margin: '50px auto' }}>
                <DatePicker onChange={handleBeginChange} />
                <div style={{ marginTop: 16 }}>
                    Begin Date: {beginDate ? beginDate.format('MM-DD-YYYY') : 'None'}
                </div>
                <h1>Buy In</h1>
                <div>
                    <StyledInput
                        {...inputProps}
                        placeholder="Type in here"
                    />
                    {/* <span>Value: {inputProps.value} </span> */}
                </div>
                <button>Start</button>
            </div>
            <div style={{ width: 400, margin: '50px auto' }}>
                <DatePicker onChange={handleEndChange} />
                <div style={{ marginTop: 16 }}>
                    End Date: {endDate ? endDate.format('MM-DD-YYYY') : 'None'}
                </div>

            </div>

        </div>
    );
}

export default CalendarPick;
