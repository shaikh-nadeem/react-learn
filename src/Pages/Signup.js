import React from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink, Redirect } from "react-router-dom";
import Axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import SimpleReactValidator from 'simple-react-validator';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
      first_name: '',
      last_name: '',
      password: '',
      username: '',
      mobile:'',
      email:'',
      errorMessage: '',
      errorUsernameMessage: '',
      errorEmailMessage: '',
      errorMobileMessage:'',
      isDisabled: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange = (event) => {
    event.preventDefault();
    const value = event.target.name === 'remember' ? event.target.checked : event.target.value;
    //console.log(value);
    this.setState({
        [event.target.name]: value,
        errorMessage : ''
    });
  }

  onEmailChange = (event) => {
    const email = event.target.value;
    Axios.post("https://wordpress.betadelivery.com/nadeem/facebook-main/api/check_register_user_email/" + email)
      .then(({ data }) => {
        if (data['success'] === 'success') {
          this.setState({ errorEmailMessage: data.message });
          this.setState({ isDisabled: true });
          return false;
        }else{
          this.setState({ isDisabled: false,errorEmailMessage: ''});
        }
      }).catch(err => console.log(err));
  }
  
  onUsernameChange = (event) => {
    const username = event.target.value;
    Axios.post("https://wordpress.betadelivery.com/nadeem/facebook-main/api/check_register_user_username",  {username: username })
        .then(({ data }) => {
            if (data['success'] == 'success') {
                this.setState({ errorUsernameMessage: data.message });
                this.setState({ isDisabled: true });
                return false;
            }else{
              this.setState({ isDisabled: false,errorUsernameMessage: '' });
            }
        }).catch(err => console.log(err));
  }

  onMobileChange = (event) => {
      const mobile = event.target.value;
      Axios.post("https://wordpress.betadelivery.com/nadeem/facebook-main/api/check_register_user_mobile/?mobile=" + mobile)
          .then(({ data }) => {
              if (data['success'] === 'success') {
                  this.setState({ errorMobileMessage: data.message });
                  this.setState({ isDisabled: true });
                  return false;
              }else{
                this.setState({ isDisabled: false,errorMobileMessage: '' });
              }
          }).catch(err => console.log(err));
  }

  handleSubmit(event){
    
    event.preventDefault();
    const formData = new FormData(event.target);
    if (this.validator.allValid()) {
    Axios.post('https://wordpress.betadelivery.com/nadeem/facebook-main/api/react_register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => { 
        if (response.status === 'success') {
            console.log(response.data)
        }else{
          console.log('Error')
        }
        this.props.history.push("/Login")
      })
      .catch(error => {
        console.log(error.response.data.errors)  
        // console.log(JSON.stringify(error.response.data.errors.first_name));
        console.log(this.validator.showMessages());
        console.log(this.forceUpdate());
        console.log('2')
        console.log(error)
      });
    } else {
        this.validator.showMessages();
        this.forceUpdate();
        console.log('3')
    }
  }

  render() {
    const errorMsg = { color: 'red'}
    const leftText = { textAlign: 'left'}
    const paperStyle={margin:"0px auto"}
    return (
      <>
      <div className="container my-5" style={leftText}>
        <h2>Registration Form</h2>
      <form onSubmit={this.handleSubmit} className="py-5">
      <h3 className="error"> { this.state.errorMessage } </h3>
        <div className="row">
          <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="first_name" value={this.state.first_name}  onChange={this.handleChange} placeholder="First Name" />
            <div style={errorMsg}>{this.validator.message('First Name', this.state.first_name, 'required')}</div>
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} placeholder="Last Name" />
            <div style={errorMsg}>{this.validator.message('First Name', this.state.last_name, 'required')}</div>
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" onBlur={this.onUsernameChange}  />
            <div style={errorMsg}>{this.validator.message('User Name', this.state.username, 'required')}</div>
            {this.state.errorUsernameMessage && <div style={errorMsg}>{this.state.errorUsernameMessage} </div>}
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="text" name="mobile" value={this.state.mobile} onChange={this.handleChange} placeholder="Mobile" onBlur={this.onMobileChange}  />
            <div style={errorMsg}>{this.validator.message('Mobile', this.state.mobile, 'required')}</div>
            {this.state.errorMobileMessage && <div style={errorMsg}>{this.state.errorMobileMessage} </div>}
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
            <Form.Label>Emai</Form.Label>
            <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="name@example.com" onBlur={this.onEmailChange} />
            <div style={errorMsg}>{this.validator.message('Email', this.state.email, 'required')}</div>
            {this.state.errorEmailMessage && <div style={errorMsg}>{this.state.errorEmailMessage} </div>}
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
            <div style={errorMsg}>{this.validator.message('Password', this.state.password, 'required')}</div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Button as="input" type="submit" name="submit" value="Submit"  disabled={this.state.isDisabled}/>{' '}
          </Form.Group>
          </div>
      </form>
      <Col elevation={10} style={paperStyle}>
        <div > Already Have an Account Please signIn
          <NavLink to="Login">
            <span style={{marginLeft:"4px"}}>Log In</span>
          </NavLink>
        </div>
      </Col>
      </div>
      </>
    );
  }
}

export default Signup;
