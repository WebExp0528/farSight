import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Bidsscreen extends Component {
    state = {
        todos: []
    }
    componentDidMount() {
        var url = '/api/work_order/05881777/bid';
        fetch(url, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',

            }
        }).then(res => res.json())
            .then((data) => {
                this.setState({ todos: data })
                console.log("ccs", this.state.todos)
            })
            .catch(error => console.error('Error:', error));
    }

    // [...]
    render() {

        return (
            <div className="container">
                <div>

                    <button style={{
                        height: 39,
                        width: 152, backgroundColor: "#F3B554", marginLeft: -22, color: "white", borderRadius: 3
                    }}>
                        Submit Bid
                </button>
                </div>
                <div style={{ marginTop: -39 }}>
                    <Link style={{ textDecoration: 'none' }} to={'/Createbiditem/'} >
                        <button style={{
                            height: 39,
                            width: 152, backgroundColor: "#9BC53F", marginLeft: 169, color: "white", borderRadius: 3
                        }}>
                            Create Bid
                </button>
                    </Link>
                </div>
                <div style={{ height: 122, width: 362, borderRadius: "13px", margin: 21, marginLeft: -30, backgroundColor: "#FEFEFE" }} ><br />
                    <div style={{ marginLeft: 10, color: "#6EADC8" }}>
                        Bid Items
                          </div>
                    <div style={{ marginLeft: 10, marginTop: 12, fontSize: 16 }}>
                        Pending Items :
                          </div>
                    <div style={{ marginLeft: 182, marginTop: -18, fontSize: 16 }}>

                        Total Pendings :
                          </div>
                    <div style={{ marginLeft: 10, marginTop: 10, fontSize: 16 }}>

                        Approved Items :
                          </div>
                    <div style={{ marginLeft: 182, marginTop: -18, fontSize: 16 }}>

                        Total Approved :
                          </div>
                </div>

                {this.state.todos.map((bid_item) => (
                                        <Link style={{ textDecoration: 'none' }} to={'/BidsDescriptionscreen/'} key={bid_item.bid_item_number}>

                    <div className="card">
                        <div className="card-body">
                            <div style={{ height: 140, width: 362, borderRadius: "13px", margin: 21, marginLeft: -30, backgroundColor: "#FEFEFE" }} ><br />
                                <div style={{ height: 43, width: 355, backgroundColor: "#F6F6F6", flexDirection: "row", marginTop: -20 }}>
                                    <h5 className="card-body" style={{ color: "black", paddingTop: 11, paddingLeft: 32, fontSize: 15 }}>{bid_item.item_description}</h5>
                                </div>
                                <div style={{ height: 31, width: 183, backgroundColor: "#9BC53F", color: "white", borderRadius: 2, marginTop: 30, marginLeft: 10, paddingTop: 7, paddingLeft: 5, fontSize: 13 }}>
                                    {bid_item.status}
                                </div>
                                <div style={{ flexDirection: "row" }}>
                                    <div style={{ marginLeft: 213, marginTop: -33 }}>
                                        {bid_item.number_of_units}
                                    </div>
                                    <div style={{ marginLeft: 252, marginTop: -20 }}>
                                        {bid_item.unit_of_measure}
                                    </div>
                                    <div style={{ marginLeft: 301, marginTop: -20 }}>
                                        {bid_item.usd_unit_price}
                                    </div>
                                </div>

                                <div style={{
                                    marginTop: 23, marginLeft: 193, color
                                        : "#6EADC8", fontSize: 17
                                }}>
                                    Line Total : {bid_item.total_price}
                                </div>


                            </div>



                        </div>
                    </div>
                    </Link>
                ))}
            </div>

        );
    }
}
export default Bidsscreen;