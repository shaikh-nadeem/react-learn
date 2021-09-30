import React from 'react';
import { Button, Card, ListGroup, Tab, Row, Col, Text, Typography, Form } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import {useState} from 'react';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
 
const Login=()=>{
  const leftText = {
    textAlign: 'left',
    maxWidth: 600,
  }
 
    const paperStyle={margin:"20px auto"}
    const avatarStyle={backgroundColor:'#3370bd'}
    const btnstyle={margin:'8px 0'}
     
    const [msg,setMsg] = useState('');
 
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
 
    const [user, setUser] = useState({
        email: "",
        password:""
      });
 
      let history = useHistory(); 
 
      const {email,password} = user;
      const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
 
    const signIn = (event) =>
    {
 
      event.preventDefault();
      // const users = { username };  // To Store Email in Localstore and send to Home Page 

      
      const users = 'Test user';  // To Store Email in Localstore and send to Home Page 
 
       if(user.email === '')
       {
         alert('Email Field is empty')
       }
       else if(user.password === '')
       {
         alert('Pass Field is empty')
       }
 
       axios.post(
         "https://wordpress.betadelivery.com/nadeem/facebook-main/api/react_login",user, {
            headers: {
              "Access-Control-Allow-Headers": "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept",
              "Access-Control-Allow-Origin": "https://wordpress.betadelivery.com/nadeem/facebook-main/api/react_login",
              "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE, OPTIONS, HEAD",
              "Access-Control-Expose-Headers": "Access-Control-*",
              "Allow": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
              "Content-Type": "application/json"
            },
         }    
      )
       .then(response => {
       const user_data = response.data.userData              
        console.log('User Data : '+ user_data)
        console.log('Access token : '+ response.data.access_token)

        // store the user in localStorage
        setUser(user_data) 
        // set the state of the user
        localStorage.setItem('userId', user_data.id)
        localStorage.setItem('userName', user_data.username)
        localStorage.setItem('userEmail', user_data.email)
        localStorage.setItem("access_token",response.data.access_token);
        // history.push("/Home");
      }).catch(err => console.log(err));
    }
 
    
    return(
      <>
      <div className="container my-5" style={leftText}>
        <h3>Sign In</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control label='Email'  name="email" value={email}  onChange={e => onInputChange(e)} placeholder='Enter Email' type='text' fullWidth required/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control label='Password'  name="password" value={password}  onChange={e => onInputChange(e)} placeholder='Enter password' type='text' fullWidth required/>
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          <Button type='submit' onClick={signIn} color='primary' variant="primary"  style={btnstyle} fullWidth>Sign in</Button>
          
        </Form>
        <Col elevation={10} style={paperStyle}>
              <div > Don't Have Account ?
                <NavLink to="Signup">
                 <span style={{marginLeft:"4px"}}>Singup</span>
                </NavLink>
              </div>
          </Col>
          </div>
        </>
    )
}
 
export default Login