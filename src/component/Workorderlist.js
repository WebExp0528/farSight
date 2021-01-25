import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faHistory,faEye, faChessRook } from '@fortawesome/free-solid-svg-icons';
import {Badge, Card, Container,Form, Image, InputGroup, Row, Spinner, Navbar} from 'react-bootstrap';
import { getWorkOrders } from '../store/actions/WorkorderlistAction';
//import './Workorder.css';
import '../bootstrap.min.css'

class Workorderlist extends Component {
  isLoading = true;
  state = {
    workOrders: [],
    filter: "",

  }

  componentDidMount() {
    this.props.getWorkOrders();
    this.isLoading = false;
  }
  handleChange = event => {
    this.setState({ filter: event.target.value });
  };
  getItemStatus = (item)=>
  {
    let dueDate = new Date(item.due_date);
    let today = new Date();
    let statusMessage = "Unknown";
    if(dueDate.getDate() > today)
    {
     statusMessage = "On Time";
    }
    if(dueDate.getDate() === today)
    {
      statusMessage = "Due Today";
    }
    if(dueDate < today)
    {
      statusMessage = "Past Due"
    }
    return statusMessage;
  };
  getItemStatusBadgeClass(item)
  {
    let status = this.getItemStatus(item);
    let itemClass = "primary";
    switch(status){
      case "On Time":
      itemClass = "success";
      break;
      case "Due Today":
      itemClass = "warning";
      break;
      case  "Past Due":
      itemClass = "danger";
      break;
      default:
      itemClass = "secondary";
      break;
    }
    
    return itemClass;
  }
  render() {
    const { workOrders } = this.props.workOrders
    console.log(this.props.workOrders)
    const { filter } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = workOrders.filter(item => {
      return Object.keys(item).some(key =>
        typeof item[key] === "string" && item[key].toLowerCase().includes(lowercasedFilter)
      );
    });


    return (
      
        
            <div style={{color:"whitesmoke"}}>
            <Navbar style={{paddingBottom:0,paddingTop:5}} bg="primary" variant="dark">
            
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
            <Container style={{marginTop:"0.5em",marginBottom:"0.5em"}}>
          <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} style={{borderRight:0}}/>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control type="text" placeholder="Search Work Orders..." value={filter} onChange={this.handleChange} />
          </InputGroup>
    
    </Container>
    <div style={{backgroundColor:"#e5e5e5"}}>    
<Container>

<div style={{ padding:"0.5em",fontSize: 17,color:"grey", textAlign:"center"}}>Select a work order to get started</div>
            {
              this.isLoading?<center><hr/><div>Loading...</div><br/><Spinner animation="border" variant="secondary" /><hr/></center>:
              filteredData.map(item =>
              <div key={'WO'+item.won}>
                <Card style={{marginBottom:"0.5em"}}>
                  <Card.Body style={{padding:"0.25em"}}>
                  <Image src={item.image_url_small} style={{float:"left",width:"20%",height:"100%",margin:"0.25em",marginRight:"2em"}} float="left" thumbnail roundedCircle/>                    
                    <Card.Title><Link  to={'/Workorderdetails/' + item.won}>{item.work_ordered}</Link></Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                              {item.address_street} {item.address_city}, {item.address_state}
                  </Card.Subtitle>                  
                  </Card.Body>
                  <Card.Footer style={{padding:"0.5em",fontSize:"0.75em",textAlign:"right"}} >
                  <Link style={{float:"left"}}><FontAwesomeIcon icon={faHistory} flip="horizontal"/>&nbsp;Update Status</Link><span style={{color:"grey"}}>Work&nbsp;Order&nbsp;#{item.won}</span> &nbsp;&nbsp;&nbsp;&nbsp;<Badge variant="primary">Due: {new Date(item.due_date).toDateString()}</Badge>    &nbsp;&nbsp;&nbsp;&nbsp;<Badge variant={this.getItemStatusBadgeClass(item)}>{this.getItemStatus(item)}</Badge>                  
                  </Card.Footer>        
                </Card>
                
              </div>
            )}

</Container>
</div>            
</div>

    )
  }
}

const mapStateToProps = (state) => ({ workOrders: state.workOrders })

export default connect(mapStateToProps, { getWorkOrders })(Workorderlist)