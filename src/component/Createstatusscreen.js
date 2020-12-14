
import React, { useState } from 'react';
import Popup from '../Comman/Popup';

function App() {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    

    return <div>
         <div style={{ border: "2px solid #64B9E6", marginTop: 30, marginLeft: 10, width: 350 ,flexDirection:"row",borderRadius: "7px",fontSize:"15px"}}>
        <div style={{height: "1px", paddingLeft: 10}}>
        <h5 style={{ fontSize: 14 }}>ECD : 2020-12-14</h5>
        </div>
        <div style={{paddingLeft:193}}>
        <h5 style={{ fontSize: 14 }}>My equipment is not waterproof.  I have to wait until it is dry.</h5>

        </div><br />
       
        </div>
        <input
            type="button"
            style={{ marginLeft: 120, margin:124,height: 30, border: "2px solid #64B9E6", borderRadius: "7px", color: "black" }}
            value="New Status Update"
            onClick={togglePopup}
        />
        {isOpen && <Popup
            content={<>
                <h5 style={{ fontSize: 14 }}>New Status Update</h5><br />
                <h5 style={{ fontSize: 14 }}>My equipment is not waterproof.  I have to wait until it is dry.</h5> <br />
                <input type="date" data-date="" data-date-format="DD MMMM YYYY" value="2020-11-15" /><br />

                <input type="text" style={{ marginTop: 30 ,height:30}} class="form-control" placeholder="Enter Status Updates notes" /> <br />

                <button style={{ marginTop: 30, height: 30, border: "2px solid #64B9E6", borderRadius: "7px", color: "black" }}>Save Status Update</button>
            </>}
            handleClose={togglePopup}
        />}
    </div>
}

export default App;