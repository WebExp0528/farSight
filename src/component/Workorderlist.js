import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { getUsers } from '../store/actions/WorkorderlistAction'
import './Workorder.css';


class Workorderlist extends Component {
  state = {
    users: [],
    filter: "",

  }

  componentDidMount() {
    this.props.getUsers()

  }
  handleChange = event => {
    this.setState({ filter: event.target.value });
  };
  render() {
    const { users } = this.props.users
    console.log(this.props.users)
    const { filter } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = users.filter(item => {
      return Object.keys(item).some(key =>
        typeof item[key] === "string" && item[key].toLowerCase().includes(lowercasedFilter)
      );
    });


    return (
      <div style={{ backgroundColor: "#EEF0F2" }}>
        <div className="container">
          <div className="col-xs-12">
            <div style={{ height: 70, width: 376, marginTop: -59, backgroundColor: "#47A5CE", marginLeft: -39 }}>
              <div style={{ marginLeft: 77, paddingTop: "21px", color: "white" }}>
                <h6>Welcome, Bob Burger</h6>
              </div>
            </div>
            <div class="form-group has-search" style={{ height: 86, marginTop: 10, width: 367, marginLeft: -21, borderRadius: 5 }}>
              <span class="fa fa-search form-control-feedback"></span>
              <input type="text" class="form-control" placeholder="Search Work Orders" value={filter} onChange={this.handleChange} />
            </div>

            <span style={{ fontSize: 17, marginLeft: 17 }}>Select a work order to get started</span>

            {/* <Link to="/Workorderdetails" >Go to product</Link> */}
            {filteredData.map(item =>
              <Link style={{ textDecoration: 'none' }} to={'/Workorderdetails/' + item.won}>
                <div className="card">
                  <div className="card-body">
                    <div style={{ height: 125, width: 354, borderRadius: "13px", margin: 21, marginLeft: -30, backgroundColor: "#FEFEFE" }} ><br />
                      <div style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                        <div style={{ height: "17px", paddingLeft: 34, marginTop: "-10px" }}>
                          <img src={item.image_url_small} style={{
                            width: 80,
                            height: 80,
                            borderRadius: 80 / 2,
                            overflow: "hidden",
                            borderWidth: 3,
                            borderColor: "red"
                          }} />
                        </div>
                        <div key={item.won}>

                          <div>
                            <div style={{ marginTop: 10 }}>
                              <h5 className="card-body" style={{ color: "black", paddingLeft: 162, fontSize: 15, marginTop: -14 }}>Work Order #
                            {item.won}</h5>
                              <h5 className="card-body" style={{ color: "#64B9E6", paddingLeft: 162, fontSize: 15 }}>{item.address_city}</h5>
                              {/* </Link> */}
                              <h5 className="card-title" style={{ color: "#64B9E6", paddingLeft: 162, fontSize: 15 }}>{item.address_state}</h5>
                            </div>
                            <div style={{ height: 27, width: 355, backgroundColor: "#F6F6F6", marginTop: 30, flexDirection: "row" }}>
                              <h5 className="card-title" style={{ color: "#64B9E6", paddingLeft: 112, fontSize: 11, paddingTop: 7 }}>{item.work_ordered}</h5>
                              <h5 className="card-title" style={{ color: "black", paddingLeft: 241, fontSize: 10, marginTop: -8 }}>{item.due_date} (On Time)</h5>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({ users: state.users })

export default connect(mapStateToProps, { getUsers })(Workorderlist)