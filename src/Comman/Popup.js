import React from "react";
import './Popupstyles.css';
 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>Cancel</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;