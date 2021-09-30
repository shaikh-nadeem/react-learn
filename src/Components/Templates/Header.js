import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Container, NavDropdown, Nav, Button} from "react-bootstrap";

class Header extends React.Component{
  state = { redirect: '/Login' };
	render() {
    const btnstyle={margin:'8px 0'}
    return (
      
        <div>
          <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>                
                <Nav.Link href="/signup">Signup</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
                </NavDropdown>            
               {/* <Button type='submit' color='primary' justifyContent="flex-end" variant="contained" style={btnstyle} fullWidth>Logout</Button> */}

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </div>
    )
  }
}

export default Header;