import React from 'react';
import { Button, Card, ListGroup, Tab, Row, Col } from 'react-bootstrap';
import { useHistory, useParams } from "react-router-dom";
 
const Home=()=>{
 
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#3370bd'}
    const btnstyle={margin:'8px 0'}
 
    const {users} = useParams();  
    let history = useHistory(); 
 
    const usersss = localStorage.getItem('users');
      
    const logout = () => 
    {
        localStorage.removeItem("users")
        history.push("/");
    }
 
    return(
        <div className="">
           <Row>
             <div style={{  float:"right",marginRight:"50px"}}>
                           
               <Button type='submit' onClick={logout} color='primary' justifyContent="flex-end" variant="contained" style={btnstyle} fullWidth>Logout</Button>
             
            </div>
          </Row>            
            <h4 style={{textAlign:"left",marginLeft:"10px"}}>Welcome To Home : <span style={{color:"blue"}}>{usersss}</span></h4>
            <h2 style={{color:"green"}}>Welcome To Home Page </h2>
            <p>React (also known as React.js or ReactJS) is an open-source front-end JavaScript library for building user interfaces or UI components. It is maintained by ...
            <p>React · Declarative. React makes it painless to create interactive UIs. · Component-Based. Build encapsulated components that manage their own state, then ...</p>
            
            <Row container direction="row" justify="center" alignItems="center">
             <Col item xs={4}>
                <div gutterBottom variant="subtitle1">
                  Standard license
                </div>
                <div variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </div>
                <div variant="body2" color="textSecondary">
                  ID: 1030114
                </div>
              </Col>
              <Col item xs={4}>
                <div gutterBottom variant="subtitle1">
                  Standard license
                </div>
                <div variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </div>
                <div variant="body2" color="textSecondary">
                  ID: 1030114
                </div>
              </Col>
              <Col item xs={4}>
                <div gutterBottom variant="subtitle1">
                  Standard license
                </div>
                <div variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </div>
                <div variant="body2" color="textSecondary">
                  ID: 1030114
                </div>
              </Col>
            </Row>
         </p>
        </div>
    )
}
 
export default Home