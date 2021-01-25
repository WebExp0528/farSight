import React, { Component } from 'react'
import Popup from '../Comman/Popup';
import { Link,Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faHistory,faEye, faChessRook } from '@fortawesome/free-solid-svg-icons';
import {Badge, Card, Container,Form, Image, InputGroup, Row, Spinner, Navbar} from 'react-bootstrap';
import axios from 'axios';



class LogIn extends Component {
    isLoading = true;
    isLoggedIn = false;
    state = {
        error: {},
        isOpen: false,
        ispageStatus: false
      }
    componentDidMount() {

        let token = this.props.match.params.token
        fetch('/auth/magicLink/' + token, {
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          }
        })
        .then(res => {
          this.isLoading = false;
          console.log('success-->', res);

          let obj = res.data;
          this.isLoggedIn = res.ok;
          this.setState(prevState => ({
            ...prevState,
            error: obj
          }))
        })
        .catch(e=>{
          this.isLoading = false;
          console.log('err-->', e)
          this.setState(prevState => ({
            ...prevState,
            error: JSON.stringify(e)
          }))
        });
      }
      redirectHome(){
          return (<Redirect to="/"></Redirect>);
      }
      renderAuthenticationError(){
          return(
          <Card style={{marginBottom:"0.5em"}}>
            <Card.Body style={{padding:"0.25em"}}>
            
            <Card.Title>Authentication Failure</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {this.state.error}
            </Card.Subtitle>
            If you are a registered user, a new authentication link has been sent to your email address on file.  Please check your email and try again.                   
            </Card.Body>
            <Card.Footer style={{padding:"0.5em",fontSize:"0.75em",textAlign:"right"}} >
                
            </Card.Footer>        
        </Card>
      );
      }
      render() {
        return (  
                <div style={{color:"grey"}}>
                <Navbar style={{color:"whitesmoke",paddingBottom:0,paddingTop:5}} bg="primary" variant="dark">
                
                  <div style={{textAlign:"center", margin:-10,padding:0,boxSize:0}}>
                    <div style={{margin:-5,padding:-5}}>
                      <FontAwesomeIcon icon={faEye} size="lg" style={{margin:0,padding:0}}/>
                    </div>
                    <div style={{margin:0,padding:0}}>
                      <FontAwesomeIcon icon={faChessRook} size="2x" style={{margin:0,padding:0}}/>
                    </div>
                  </div>
                  <Navbar.Brand style={{marginLeft:15}}>FarSight™<div style={{marginTop:-8,paddingTop:0,fontSize:"0.75em"}}>by Northsight</div></Navbar.Brand>
                </Navbar>
                <div style={{backgroundColor:"#e5e5e5"}}>    
                    <Container>
                        {
                            this.isLoading?<center><hr/><div>Authenticating Token...</div><br/><Spinner animation="border" variant="secondary" /><hr/></center>:
                            this.isLoggedIn?this.redirectHome():this.renderAuthenticationError()
                        }
    
                    </Container>
                </div>            
            </div>
            )
      }
}
const mapStateToProps = (state) => ({ error: state.error })

export default connect(mapStateToProps )(LogIn)