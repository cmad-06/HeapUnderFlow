import React from 'react'
import Home from "./home.jsx";
import LoginForm from "./login.jsx";
import SignupForm from "./signup.jsx";

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class Blogger extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <Router>
                <div>
                    <h1>HeapUnderFlow</h1>
                    <Link to="/">Home</Link> | <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
                    <hr/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/signup" component={SignupForm}/>
                    <Route path="/login" component={LoginForm}/> 
                </div>
            </Router>
        )
    }
}

export default Blogger