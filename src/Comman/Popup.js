import React from "react";
import './Popupstyles.css';

const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        {/* <span style={{ marginTop: 30, height: 30, border: "2px solid #64B9E6", borderRadius: "4px", backgroundColor: "#007ABC", color: "white" }}
          onClick={props.handleClose}>Cancel</span> */}
        {props.content}
      </div>
    </div>
  );
};

export default Popup;