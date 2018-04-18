import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from "react-bootstrap"

class LoginButtons extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:{},
            compProps:props
           
        }
        this.handleProfileButton = this.handleProfileButton.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        console.log("props in LoginButtons : " + JSON.stringify(props))
        
        
    }

    
    componentWillMount(){

    }

    handleProfileButton(e){
        e.preventDefault()
        console.log("handleProfileButton");
        this.setState({user:sessionStorage.getItem("user")})
        console.log("props in LoginButtons : " + JSON.stringify(this.state.compProps))
        console.log("UserDetails in LoginButtons : " + JSON.stringify(this.state.user))
        this.props.history.push({
            pathname: '/userprofile',
            user:this.state.user,
        })
    }

    handleLogout(e){
        e.preventDefault()
        console.log("handleLogout");
        sessionStorage.setItem("isLoggedIn" , "false")
        sessionStorage.setItem("userId" , "")
        sessionStorage.setItem("user" , JSON.stringify({}))
        sessionStorage.setItem("token" , "")
        this.forceUpdate();
        this.props.history.push({
            pathname: '/'
        })
    }

    render(){
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if ( isLoggedIn === "true"){
            return (
                <p className="navbar-text navbar-right" >
					<Link className="btn btn-primary"  to="/">Home</Link> | <Button className="btn btn-primary" onClick= {this.handleProfileButton} >My Profile</Button> | <Button className="btn btn-primary" onClick= {this.handleLogout}>Logout</Button> 
				</p>
            )
        }
        return (
            <p className="navbar-text navbar-right" >
				<Link className="btn btn-primary"  to="/">Home</Link> | <Link className="btn btn-primary"  to="/signup">Signup</Link> | <Link className="btn btn-primary" to="/login">Login</Link> 
			</p>
        )
    }
}

export default LoginButtons