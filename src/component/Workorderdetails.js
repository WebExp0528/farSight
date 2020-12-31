import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { getDetails } from '../store/actions/WorkorderlistAction'
import axios from 'axios';
import Popup from '../Comman/Popup';
import Bidsscreen from './Bidsfeature/Bidsscreen'
import Sidebar from '../Menubar/Sidebar'
import Navigation from '../Navigationbar/Navigation'



class Workorderdetails extends Component {

  state = {
    won: {},
    isOpen: false,
    ispageStatus: false
  }

  componentDidMount() {

    let wonId = this.props.match.params.won
    axios.get('https://cors-anywhere.herokuapp.com/http://dev.northsight.io/api/work_order' + "/" + wonId, {
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

  togglePopup = (isOpen) => {
    this.setState(!isOpen);
  }

  render() {
    const { isOpen, ispageStatus } = this.state
    const { won } = this.props.won
    const { instructions_full } = won
    console.log("instructions", instructions_full);
    return (

      <div style={{ backgroundColor: "#EEF0F2", height: 1500 }}>
        {/* <div style={{marginLeft:30,marg}}>
         <Navigation />
         </div> */}
        {/* { ispageStatus && } */}
        <div style={{ height: 70, width: 414, marginTop: -59, backgroundColor: "#47A5CE", marginLeft: -39 }}>
          <div style={{ marginLeft: 77, paddingTop: "27px", color: "white" }}>
            {/* <img src={"https://static.thenounproject.com/png/344330-200.png"} onClick={this.props.history.push('/Workorderlist')} /> */}
            <h6 style={{ marginTop: -3, marginLeft: 64 }}>Work Order Detail</h6>
          </div>
        </div>
        {/* <div style={{ marginLeft: 30, marginTop: 30 }}>
          <h6 style={{ fontSize: 15, marginLeft: 45 }}>WO #{this.state.won.won} Service Call</h6>
        </div> */}
        <div style={{ backgroundColor: "#FEFEFE", borderRadius: "13px", height: 180, marginTop: 34, width: 367, flexDirection: "row", paddingTop: 26, marginLeft: 4 }}>
          <div style={{ height: "1px", paddingLeft: 17 }}>
            <img src={this.state.won.image_url_small} width="120" height="80" style={{
              width: 115,
              height: 117,
              borderRadius: 27,
              overflow: "hidden",
              borderWidth: 3,
              borderColor: "red"
            }} />
          </div>
          <div>
            <div style={{ marginTop: 10 }}>
              <h5 className="card-body" style={{ color: "#64B9E6", paddingLeft: 196, fontSize: 16, marginTop: -14 }}>WOrk Order<br />#
                            {this.state.won.won}</h5>
              <h5 className="card-body" style={{ color: "#777777", paddingLeft: 196, fontSize: 14 }}>{this.state.won.address_city}</h5>
              {/* </Link> */}
              <h5 className="card-title" style={{ color: "#777777", paddingLeft: 196, fontSize: 14 }}>{this.state.won.address_state}</h5>
            </div>

          </div><br />

          <h5 className="card-title" style={{ color: "#777777", paddingLeft: 196, fontSize: 11 }}>Scheduled Date : <br />{this.state.won.created_date}<br />(On Time)</h5>
        </div>
        <div>
          <div style={{ marginTop: 10, marginLeft: 89, fontSize: 17 }}>
            Work Order Instructions
                   </div>
          <div style={{ backgroundColor: "#FEFEFE", borderRadius: "13px", height: 113, marginTop: 10, width: 363, flexDirection: "row", paddingTop: 10, marginLeft: 5, fontSize: 11, paddingLeft: 8, color: "#777777" }}>
            {this.state.won.instructions_full ? this.state.won.instructions_full[0].instruction : null}
          </div>
        </div>
        <div>
          <Bidsscreen />
        </div>
       

      </div>
    );
  }
}


const mapStateToProps = (state) => ({ won: state.won })

export default connect(mapStateToProps,getDetails )(Workorderdetails)