import React, { Component } from 'react'
// import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";


class Photosscreen extends Component {
    render() {
        return (
            <div>
                <div style={{ height: 68, width: 414, marginTop: -64, backgroundColor: "#47A5CE", marginLeft: -39 }}>
                    <div style={{ marginLeft: 77, paddingTop: "27px", color: "white" }}>
                        <h6 style={{ marginTop: 0, marginLeft: 90 }}>Upload Photos</h6>
                    </div>
                </div>
                <div>
                    <button style={{ height: 77, width: 245, backgroundColor: "#98C336", color: "white", borderRadius: 7, marginLeft: 66, borderColor: "white", marginTop: 44 }}>BEFORE PHOTOS
               </button>
                </div><br />
                <div>
                    <button style={{ height: 77, width: 245, backgroundColor: "#E5A42B", color: "white", borderRadius: 7, marginLeft: 66, borderColor: "white" }}>DURING PHOTOS
               </button>
                </div><br />
                <div>
                    <button style={{ height: 77, width: 245, backgroundColor: "#4CA8CF", color: "white", borderRadius: 7, marginLeft: 66, borderColor: "white" }}>AFTER PHOTOS
               </button>
                </div><br />
                <div style={{ marginLeft: 66, marginTop: 15, fontSize: 20, color: "#4CA8CF" }}>
                    Total Photos Uploaded
               </div>
                <div>
                    <Link style={{ textDecoration: 'none' }} to={'/PhotosDescriptionscreen/'}>
                        <button style={{ height: 38, width: 184, backgroundColor: "#F3B554", color: "white", borderRadius: 7, marginLeft: 91, marginTop: 36, borderColor: "white" }}>View Photos
               </button>
                    </Link>
                </div>
            </div>
        )
    }

}
export default Photosscreen;
