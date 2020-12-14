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
      <div>
        <div className="container">
          <div className="col-xs-12">
            <div style={{ marginLeft: 30 }}>
              <h6>Welcome, Bob Burger</h6>
            </div>
            <div class="form-group has-search" style={{ backgroundColor: "#DAF2FF", height: 86, marginTop: 10, width: 320 }}>
              <span class="fa fa-search form-control-feedback"></span>
              <input type="text" class="form-control" placeholder="Search Work Orders" value={filter} onChange={this.handleChange} />
            </div>          <h6 style={{ marginTop: 20, marginLeft: 10 }}>Work Orders</h6>
            <span style={{ fontSize: 10, marginLeft: 10 }}>Select a work order to view details</span>

            {/* <Link to="/Workorderdetails" >Go to product</Link> */}
            {filteredData.map(item =>
              <div className="card">
                <div className="card-body">
                  <div style={{ height: 115, width: 300, border: '2px solid black', borderRadius: "7px", margin: 10 }} ><br />
                    <div style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                      <div style={{ height: "1px", paddingLeft: 10 }}>
                        <img src={item.image_url_small} width="100" height="80" />
                      </div>
                      <div key={item.won}>
                        <Link to={'/Workorderdetails/' + item.won}>
                          <div>
                            <h5 className="card-body" style={{ color: "black", paddingLeft: 130, fontSize: 15 }}>WO#{item.won}</h5>
                            <h5 className="card-body" style={{ color: "#64B9E6", paddingLeft: 130, fontSize: 15 }}>{item.address_city}</h5>
                            {/* </Link> */}
                            <h5 className="card-title" style={{ color: "#64B9E6", paddingLeft: 130, fontSize: 15 }}>{item.address_state}</h5>
                            <h5 className="card-title" style={{ color: "black", paddingLeft: 130, fontSize: 15 }}>{item.work_ordered}</h5>
                            <h5 className="card-title" style={{ color: "black", paddingLeft: 130, fontSize: 13 }}>{item.due_date}(On Time)</h5>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ users: state.users })

export default connect(mapStateToProps, { getUsers })(Workorderlist)