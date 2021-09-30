import logo from './logo.svg';
import './App.css';


import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Signup from './Pages/Signup';
import Login from './Pages/Login';
import About from './Pages/About';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Footer from './Components/Templates/Footer';
import Header from './Components/Templates/Header';


const loggedInUser = localStorage.getItem("userId");
function loggedIn() {
  if (loggedInUser) {
    // const foundUser = JSON.parse(loggedInUser);
    // setUser(foundUser);
    console.log('login');
  }else{
    console.log('not login');
    // this.props.history.push("/Login")
    // browserHistory.push('/');
  }
  // if (this.state.redirect) {
    // return <Redirect to={this.state.redirect} />
  // }
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
  
}

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/about" component={About}/>
             <Route path="/contact" component={Contact} onEnter={requireAuth} />             
             <Route path="/Login" component={Login} />             
             <Route path="/Signup" component={Signup}/>
           </Switch>
           <Footer />
        </div> 
      </Router>
    </div>
  );
}

export default App;
