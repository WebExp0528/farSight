
import React, { Component } from 'react'
import Popup from '../Comman/Popup';
import { Link } from "react-router-dom";
import axios from 'axios';



class Createstatusscreen extends React.Component {
    constructor() {
        super()

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

        axios.get('https://cors-anywhere.herokuapp.com/http://dev.northsight.io/api/work_order/05881777', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                "X-USER-ID": "00903200-EQ00-QUY1-UAA3-1EQUY1EQ1EQU",
                "X-APP-ID": "4010f312-fd81-4049-a482-9f2f4af24947"
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
    savestatus() {
        // const {delay_reason,expected_upload_date,explanation,order_status} = this.state;



        console.log("kk", this.state.statusdata)


        // fetch('https://cors-anywhere.herokuapp.com/http://dev.northsight.io/api/work_order/05881777',this.state.statusdata,{
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
            <div>
                <div style={{ marginLeft: 30, marginTop: 30 }}>
                    <h6 style={{ fontSize: 15, marginLeft: 45, marginTop: -46 }}>WO #{this.state.won.won} Service Call</h6>
                </div>
                <div style={{ marginLeft: 10, marginTop: 20, color: "#1D1D1D", fontSize: 17 }}>Status Updates</div>
                <div style={{ border: "2px solid #64B9E6", height: 100, marginTop: 30, marginLeft: 10, width: 350, flexDirection: "row", borderRadius: "7px", fontSize: "15px" }}>
                    <div style={{ height: "1px", paddingLeft: 10 }}>
                        <h5 style={{ fontSize: 14, marginTop: 25 }}>ECD : {this.state.won.last_status_update ? this.state.won.last_status_update.expected_upload_date : null}</h5>
                    </div>
                    <div style={{ paddingLeft: 193 }}>
                        <h5 style={{ fontSize: 14 }}>{this.state.won.last_status_update ? this.state.won.last_status_update.explanation : null}</h5>

                    </div><br />

                </div>
                <input
                    type="button"
                    style={{ marginLeft: 120, margin: 86, width:197, height: 30, border: "2px solid #64B9E6", borderRadius: "7px", backgroundColor: "#007ABC", color: "white" }}
                    value="New Status Update"
                    onClick={this.togglePopup}
                />
                {isOpen && <Popup
                    content={<>
                        <div style={{ marginLeft: 10 }}>
                            <h5 style={{ fontSize: 14 }}>New Status Update</h5><br />
                            <h5 style={{ fontSize: 14 }}>Estimated Completion Date</h5><br />

                            <input type="date"
                                style={{ marginTop: 4, height: 30, border: "2px solid #64B9E6", borderRadius: "5px" }}
                                type="text"

                                onChange={(event) => { this.setState({ delay_reason: event.target.value }) }}
                            /><br />
                            <input
                                type="text"
                                style={{ marginTop: 30, height: 30, border: "2px solid #64B9E6", borderRadius: "4px" }}
                                class="form-control"
                                placeholder=""

                                onChange={(event) => { this.setState({ expected_upload_date: event.target.value }) }}
                            /> <br />
                            <input
                                type="text"
                                style={{ marginTop: 30, height: 30, border: "2px solid #64B9E6", borderRadius: "4px" }}
                                class="form-control"
                                placeholder="Enter status updates notes"
                                onChange={(event) => { this.setState({ [this.state.statusdata.explanation]: [event.target.value] }) }}
                            /> <br />

                            <input
                                type="text"
                                style={{ marginTop: 30, height: 30, border: "2px solid #64B9E6", borderRadius: "4px" }}
                                class="form-control"
                                placeholder=""
                                onChange={(event) => { this.setState({ order_status: event.target.value }) }}
                            /> <br />

                            <button
                                style={{ marginTop: 30, height: 30, border: "2px solid #64B9E6", borderRadius: "4px", backgroundColor: "#007ABC", color: "white" }}
                                onClick={() => { this.savestatus() }} >Save Status Update
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