import React from 'react'
import Home from "./home.jsx";
import LoginForm from "./login.jsx";
import UserProfile from "./userprofile.jsx";
import BlogPage from './blogpage.jsx'
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
            data : {},
            
        }
        sessionStorage.setItem("isLoggedIn" , false)
    }

    render(){
        const isLoggedIn=sessionStorage.getItem("isLoggedIn")
        console.log(`is Logged in :${isLoggedIn}` )
        const buttons = (
            <p className="navbar-text navbar-right" >
					<Link className="btn btn-primary"  to="/">Home</Link> | <Link className="btn btn-primary"  to="/signup">Signup</Link> | <Link className="btn btn-primary" to="/login">Login</Link> 
						</p>
        )
        return (
            <Router>
                <div className="header-blue">
                    <nav className="navbar navbar-default navigation-clean-search">
		    	        <div className="container">
                        <div className="navbar-header">
					    <a className="navbar-brand navbar-link" href="/">HeapUnderFlow</a>
				</div>
				<div className="collapse navbar-collapse" id="navcol-1">
					<div id="header"></div>
					{buttons}
                            
				</div>

			</div>
		</nav>

                    
                    <Route exact path="/" component={Home} history={this.props.history}/>
                    <Route path="/signup" component={SignupForm}/>
                    <Route path="/login" component={LoginForm}/> 
                    <Route path="/userprofile" component={UserProfile}/>
                    <Route path="/blogPage/:blogId" component={BlogPage}/> 
                    <br/>
                    
                </div>
                
            </Router>
        )
    }

    

}

export default Blogger