import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { getDetails } from '../store/actions/WorkorderlistAction'
import axios from 'axios';

class Workorderdetails extends Component {
  
  state = {
    won: {},
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

  render() {
    const { won } = this.props.won
    const { instructions_full } = won
    console.log("instructions", instructions_full);
    return (
      <div>
        <div style={{ marginLeft: 30, marginTop: 30 }}>
          <h6>WO #{this.state.won.won} Service Call</h6>
        </div>
        <div style={{ backgroundColor: "#DAF2FF", height: 153, marginTop: 34, width: 348, flexDirection: "row", paddingTop: 26, marginLeft: 10 }}>
          <div style={{ height: "1px", paddingLeft: 10 }}>
            <img src={this.state.won.image_url_small} width="120" height="80" />
          </div>
          <h5 className="card-title" style={{ color: "black", paddingLeft: 175, fontSize: 15 }}>Scheduled Date : <br />{this.state.won.created_date}<br />(On Time)</h5>
        </div>
        <div>
          <div style={{ marginTop: 30, marginLeft: 64 }}>
            Work Order Instructions
                   </div>
          <div style={{ border: "2px solid #64B9E6", marginTop: 30, marginLeft: 10, width: 350,borderRadius: "7px",fontSize:"15px" }}>
            {this.state.won.instructions_full ? this.state.won.instructions_full[0].instruction : null}
          </div>
        </div>
        <div style={{ border: "2px solid #64B9E6", marginTop: 30, marginLeft: 10, width: 350 ,flexDirection:"row",borderRadius: "7px",fontSize:"15px"}}>
        <div style={{height: "1px", paddingLeft: 10}}>
          {this.state.won.last_status_update?this.state.won.last_status_update.expected_upload_date:null}
        </div>
        <div style={{paddingLeft:193}}>
        {this.state.won.last_status_update?this.state.won.last_status_update.explanation:null}

        </div>
       
        </div>
        
      </div>
    );
  }
}


const mapStateToProps = (state) => ({ won: state.won })

export default connect(mapStateToProps, { getDetails })(Workorderdetails)