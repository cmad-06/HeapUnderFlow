import React from 'react'
import Home from "./home.jsx";
import LoginForm from "./login.jsx";
import UserProfile from "./userprofile.jsx";
import store from "../store/store.js";


import {fetchBlogsFromServer} from "../actions/blogActions.js";
import SignupForm from "./signup.jsx";
import {BootstrapTable, 
    TableHeaderColumn} from 'react-bootstrap-table';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class Blogger extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : {}
        }
        
    }

    render(){
        return (
            <Router>
                <div className="header-blue">
                    <nav className="navbar navbar-default navigation-clean-search">
		    	        <div className="container">
                        <div className="navbar-header">
					    <a className="navbar-brand navbar-link" href="../index.html">HeapUnderFlow</a>
				</div>
				<div className="collapse navbar-collapse" id="navcol-1">
					<div id="header"></div>
					<p className="navbar-text navbar-right">
					<Link to="/">Home</Link> | <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link> | <Link to="/userprofile">Profile</Link>
						</p>
				</div>

			</div>
		</nav>

                    
                    <Route exact path="/" component={Home}/>
                    <Route path="/signup" component={SignupForm}/>
                    <Route path="/login" component={LoginForm}/> 
                    <Route path="/userprofile" component={UserProfile}/> 
                    <br/>
                    
                </div>
                
            </Router>
        )
    }

    
/*
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
                    <br/>
                    
                </div>
                
            </Router>
        )
    }
    */
}

export default Blogger