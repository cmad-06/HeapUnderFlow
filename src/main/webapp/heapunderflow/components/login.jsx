import React from 'react'
import store from '../store/store.js'
import { connect } from 'react-redux';
import {loginUser, getUserById} from '../actions/useractions'
import {ACTION_TYPES} from '../actions/useractions'

class LoginForm extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            userDetails:{}
        }
        this.changeUserName = this.changeUserName.bind(this);
        this.changePassWord = this.changePassWord.bind(this);
        this.loginUserSubmit = this.loginUserSubmit.bind(this);
    }

    changeUserName(e){
        this.setState({
            username:e.target.value
        })
    }

   changePassWord(e){
        this.setState({
            password:e.target.value
        })
    }

    loginUserSubmit(e){
        e.preventDefault()
        console.log("Login Form Submit Clicked");
        sessionStorage.setItem("userId" , "");
        sessionStorage.setItem("token" , "");
        loginUser(this.state, data => {
            console.log("DATA  : " + JSON.stringify(data))
            sessionStorage.setItem("userId" , data.userId);
            sessionStorage.setItem("token" , data.token);
            getUserById(data.userId,data => {
                sessionStorage.setItem("user" , JSON.stringify(data));
                this.props.history.push({
                    pathname: '/userprofile',
                    user:data.userId,
                })
            }); 
            
        })
        console.log(this.state.username);
    }

    componentWillReceiveProps(){
    /*    console.log("Props at did mount" + JSON.stringify(this.props));
        console.log("Props at did mount" + JSON.stringify(this.state.userDetails));
        let state = store.getState()
        sessionStorage.setItem("isLoggedIn" , "true");
        this.props.history.push({
            pathname: '/userprofile',
            user:state.user.user,
        })*/
    }
    render(){
        
        return (
            <div className="container" id="registration-form">
			<div className="frm">
				<h1>Login</h1>
				
				<form onSubmit={this.loginUserSubmit}>
                    <div className="form-group required">
						<label id="username" className='control-label'>Username:</label> 
                        <input type="text" className="form-control" name="username"  placeholder="Enter username" defaultValue={this.state.username} onChange={this.changeUserName}/>
					</div>
					<div className="form-group required">
						<label id="password" className='control-label'>Password:</label> <input type="password"
							className="form-control" name="password" placeholder="Enter password"defaultValue={this.state.password} onChange={this.changePassWord}/>
					</div>
                    <button>Login</button>
                </form>
			</div>
		</div>
        )
    }
}

function mapDispatchToProps(dispatch){
    console.log("mapDispatchToProps")
}

function mapStateToProps(state){
    console.log("mapStateToProps Props" + JSON.stringify(state)) ;
    return {
        userDetails : state.user
    }
}

export default connect(mapStateToProps, {loginUser, getUserById})(LoginForm)