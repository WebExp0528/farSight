import React, { Component } from 'react'
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {getUsers} from '../store/actions/WorkorderlistAction'
// import {getDetails} from '../store/actions/WorkorderlistAction'

class Workorderdetails extends Component {
    // state = {
    //     users: [],
    //   }
     
    // componentDidMount(){
    //     this.props.getUsers()
        
    // }
  
   
    render() {
        
        return (
            <div>
               fff
               
            </div>
        )
    }
}


const mapStateToProps  = (state) => ({users:state.users})

export default connect(mapStateToProps, {getUsers})(Workorderdetails)