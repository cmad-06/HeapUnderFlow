import React from 'react'
import Home from "./home.jsx";
import LoginForm from "./login.jsx";
import UserProfile from "./userprofile.jsx";
import BlogPage from './blogpage.jsx'
import store from "../store/store.js";
import LoginButtons from './loginButtons.jsx'


import {fetchBlogsFromServer} from "../actions/blogActions.js";
import SignupForm from "./signup.jsx";
import { Button } from "react-bootstrap"
import {BootstrapTable, 
    TableHeaderColumn} from 'react-bootstrap-table';

import {hashHistory, BrowserRouter as Router, Route, Link} from 'react-router-dom';

class Blogger extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : {},
            isLoggedIn:"false"
            
        }
        this.handleLogin = this.handleLogin.bind(this);
        
        store.subscribe( this.handleLogin );
        const isLoggedIn=sessionStorage.getItem("isLoggedIn");
        if (isLoggedIn==="false"){
            this.resetSessionVaribles()
        }
    }

    handleLogin(){
        const isLoggedIn=sessionStorage.getItem("isLoggedIn")
        if ( isLoggedIn != this.state.isLoggedIn){
            this.setState({isLoggedIn})
            this.forceUpdate;
        }
    }

    resetSessionVaribles(){
        sessionStorage.setItem("isLoggedIn" , "false")
        sessionStorage.setItem("userId" , "")
        sessionStorage.setItem("user" , JSON.stringify({}))
        sessionStorage.setItem("token" , "")
    }

    render(){
        
        return (
            <Router history={hashHistory}>
                <div className="header-blue">
                    <nav className="navbar navbar-default navigation-clean-search">
                        <div className="container">
                        <span>
                        <div className="navbar-header">
                        <Link className="navbar-brand " to="/">HeapUnderFlow</Link>
                        <form className="navbar-form navbar-left" target="_self">
                            <div className="form-group">
                                <input className="form-control search-field" type="search" name="search" id="search-field" placeholder="Search"/>
                            </div>
	                    </form>
                </div>
                </span>
				<div className="collapse navbar-collapse" id="navcol-1">
					<div id="header"></div>
					<LoginButtons history={this.props.history}/>
                            
				</div>

			</div>
		</nav>
                    <Route exact path="/" component={Home} history={this.props.history}/>
                    <Route path="/signup" component={SignupForm} history={this.props.history}/>
                    <Route path="/login" component={LoginForm} history={this.props.history}/> 
                    <Route path="/userprofile" component={UserProfile} history={this.props.history}/>
                    <Route path="/blogPage/:blogId" component={BlogPage} history={this.props.history}/> 
                    <br/>
                    
                </div>
                
            </Router>
        )
    }

    

}

export default Blogger