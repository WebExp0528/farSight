import React, { Component } from 'react'

class Submitworkorder extends Component {
    render() {
        return (
            <div style={{ backgroundColor: "#EEF0F2", height: 800 }}>
                <div style={{ height: 68, width: 414, marginTop: -64, backgroundColor: "#47A5CE", marginLeft: -39 }}>
                    <div style={{ marginLeft: 57, paddingTop: "27px", color: "white" }}>
                        <h6 style={{ marginTop: 0, marginLeft: 90 }}>Submit work order</h6>
                    </div>
                </div>

                <div style={{ height: 536, width: 339, backgroundColor: "white", marginLeft: 20, marginTop: 53 }}>

                    <div style={{ flexDirection: "row", alignItems: "center", display: "flex" }}>
                        <div style={{ fontSize: 16, marginLeft: 9, marginTop: 56 }}>
                            Work Completed
                    </div>


                        <div>
                            <select style={{ height: 25, width: 175, marginLeft: 16, marginTop: 56 }}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ flexDirection: "row", alignItems: "center", display: "flex" }}>
                        <div style={{ fontSize: 16, marginLeft: 9, marginTop: 56 }}>
                            Date Serviced
                    </div>
                        <div style={{ marginTop: 52, marginLeft: 33 }}>
                            <input type="text" id="your-input" />
                        </div>
                    </div>
                    <div style={{ fontSize: 16, marginLeft: 9, marginTop: 56 }}>
                        Vendor Notes to Staff
                    </div>
                    <div>
                        <input style={{ height: 120, width: 322, marginLeft: 10, marginTop: 30, borderRadius: 5, paddingLeft: 41 }} type="text" placeholder="Enter Notes" />
                    </div>
                    <div>
                        <input style={{ height: 48, width: 164, marginLeft: 87, marginTop: 50, borderRadius: "7px", backgroundColor: "#007ABC", color: "white" }} type="submit" name="Submit" />
                    </div>


                </div>


            </div>
        )
    }

}
export default Submitworkorder;
