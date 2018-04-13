import React from 'react'
import {BrowserRouter as Link} from 'react-router-dom';


class Header extends React.Component {
    constructor(props){
        super(props)
    }
    guestButtons(){
        return (
            <p className="navbar-text navbar-right" >
					<Link className="btn btn-primary"  to="/">Home</Link> | <Link className="btn btn-primary"  to="/signup">Signup</Link> | <Link className="btn btn-primary" to="/login">Login</Link> 
						</p> 
        )
    }

    userButtons(){
        return (
            <p className="navbar-text navbar-right" >
					<Link className="btn btn-primary"  to="/">Home</Link> | <Link className="btn btn-primary"  to="/userprofile">My Profile</Link> | <Link className="btn btn-primary" to="/">Logout</Link> 
						</p> 
        )
    }
    render(){
        const isLoggedIn=sessionStorage.getItem("isLoggedIn")
        console.log(`is Logged in :${isLoggedIn}` )
        const buttons = (isLoggedIn == false) ? this.userButtons() : this.guestButtons(); 
        return (
            <p className="navbar-text navbar-right" >
					<Link className="btn btn-primary"  to="/">Home</Link> | <Link className="btn btn-primary"  to="/userprofile">My Profile</Link> | <Link className="btn btn-primary" to="/">Logout</Link> 
						</p> 
        )
    }
}

export default Header