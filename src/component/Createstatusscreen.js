
import React, { Component } from 'react'
import Popup from '../Comman/Popup';
import { Link } from "react-router-dom";
import axios from 'axios';



class Createstatusscreen extends Component {
    constructor() {
        super();
        this.state = {
            won: {},
            isOpen: false,
            statusdata: {
                delay_reason: null,
                expected_upload_date: null,
                explanation: null,
                order_status: null
            }
        }
    }
    componentDidMount() {

        axios.get('/api/work_order/05881777', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            }
        }).then(res => {
            console.log('success-->', res)
            let obj = res.data
            this.setState(prevState => ({
                ...prevState,
                won: obj
            }))
        }
        )
    }


    togglePopup = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }
    // handleChange = e => {
    //     this.setState({ [e.target.name]: e.target.value })
    //     console.log("dcc")

    // }
    savestatus = () => {
        // const {delay_reason,expected_upload_date,explanation,order_status} = this.state;



        console.log("kk", this.state.statusdata)


        // fetch('/api/work_order/05881777',this.state.statusdata,{
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'X-Requested-With': 'XMLHttpRequest',
        //         "X-USER-ID": "00903200-EQ00-QUY1-UAA3-1EQUY1EQ1EQU",
        //         "X-APP-ID": "4010f312-fd81-4049-a482-9f2f4af24947"
        //     },
        //     body: JSON.stringify(this.state)
        // }).then(response => {
        //         console.log(response)
        //     })
        //     .catch(error =>{
        //         console.log(error)
        //     })
    }
    render() {
        const { won, statusdata } = this.state

        const { isOpen, ispageStatus } = this.state


        return (
            <div style={{ backgroundColor: "#EEF0F2", height: 877 }}>
                <div style={{ height: 68, width: 414, marginTop: -64, backgroundColor: "#47A5CE", marginLeft: -39 }}>
                    <div style={{ marginLeft: 77, paddingTop: "27px", color: "white" }}>
                        <h6 style={{ marginTop: 0, marginLeft: 90 }}>Status Update</h6>
                    </div>
                </div>

                <div style={{ marginLeft: 129, marginTop: 20, color: "#1D1D1D", fontSize: 17 }}>Status Updates</div>
                <div style={{ backgroundColor: "#FEFEFE", borderRadius: "13px", height: 113, marginTop: 10, width: 363, flexDirection: "row", paddingTop: 10, marginLeft: 5, fontSize: 11, paddingLeft: 8, color: "#777777" }}>
                    <div style={{ height: "1px", paddingLeft: 10 }}>
                        <h5 style={{ fontSize: 14, marginTop: 25 }}>ECD : {this.state.won.last_status_update ? this.state.won.last_status_update.expected_upload_date : null}</h5>
                    </div>
                    <div style={{ paddingLeft: 193 }}>
                        <h5 style={{ fontSize: 14 }}>{this.state.won.last_status_update ? this.state.won.last_status_update.explanation : null}</h5>

                    </div><br />

                </div>
                <input
                    type="button"
                    style={{ marginLeft: 120, margin: 86, width: 197, height: 30, border: "2px solid #64B9E6", borderRadius: "7px", backgroundColor: "#007ABC", color: "white" }}
                    value="New Status Update"
                    onClick={this.togglePopup}
                />
                {isOpen && <Popup
                    content={<>
                        <div style={{ marginLeft: 10 }}>
                            <h5 style={{ fontSize: 17, marginLeft: 77 }}>New Status Update</h5><br />
                            <div style={{ flexDirection: "row", alignItems: "center", display: "flex" }}>
                                <div style={{ fontSize: 16, marginLeft: -11, marginTop: 5 }}>
                                    Delay Reason
                    </div>

                                <input type="date"
                                    style={{ marginTop: 4, height: 30, border: "2px solid #64B9E6", borderRadius: "5px", marginLeft: 31 }}
                                    type="text"
                                    value={this.state.statusdata.delay_reason}
                                    name="delay_reason"
                                    onChange={(data) => { this.setState({ delay_reason: data.target.value }) }}
                                />
                            </div>
                            <br />
                            <div style={{ flexDirection: "row", alignItems: "center", display: "flex" }}>
                                <div style={{ fontSize: 16, marginLeft: -11, marginTop: 5 }}>
                                    Expected Upload date
                    </div>
                                <input
                                    type="text"
                                    style={{ marginTop: 6, height: 30, border: "2px solid #64B9E6", borderRadius: "4px", marginLeft: 31 }}
                                    className="form-control"
                                    placeholder=""
                                    value={this.state.statusdata.expected_upload_date}
                                    name="expected_upload_date"

                                    onChange={(data) => { this.setState({ expected_upload_date: data.target.value }) }}
                                />
                            </div> <br />
                            <div style={{ flexDirection: "row", alignItems: "center", display: "flex" }}>
                                <div style={{ fontSize: 16, marginLeft: -11, marginTop: 5 }}>
                                    Explanation
                    </div>
                                <input
                                    type="text"
                                    style={{ marginTop: 6, height: 30, border: "2px solid #64B9E6", borderRadius: "4px", marginLeft: 50 }}
                                    className="form-control"
                                    value={this.state.statusdata.explanation}
                                    name="explanation"

                                    onChange={(data) => { this.setState({ explanation: data.target.value }) }}
                                />
                            </div><br />
                            <div style={{ flexDirection: "row", alignItems: "center", display: "flex" }}>
                                <div style={{ fontSize: 16, marginLeft: -11, marginTop: 5 }}>
                                    Order Status
                    </div>

                                <input
                                    type="text"
                                    style={{ marginTop: 6, height: 30, border: "2px solid #64B9E6", borderRadius: "4px", marginLeft: 41 }}
                                    className="form-control"
                                    value={this.state.statusdata.order_status}
                                    name="order_status"
                                    placeholder=""
                                    onChange={(data) => { this.setState({ order_status: data.target.value }) }}
                                />
                            </div><br />

                            <button
                                style={{ marginTop: 30, height: 30, border: "2px solid #64B9E6", borderRadius: "4px", backgroundColor: "#007ABC", color: "white" }}
                                onClick={() => { this.savestatus() }} >Save Status Update
                        </button>
                            <button
                                style={{ marginTop: 30, height: 30, border: "2px solid #64B9E6", borderRadius: "4px", backgroundColor: "#007ABC", color: "white", marginLeft: 47, width: 134 }}
                                onClick={() => { this.togglePopup() }} >Cancel
                        </button>
                        </div>

                    </>}
                    handleClose={this.togglePopup}

                />}
            </div>
        )
    }
}


export default Createstatusscreen;