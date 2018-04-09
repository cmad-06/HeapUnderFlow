import React from 'react'
import store from '../store/store.js'
import { connect } from 'react-redux';
import {loginUser} from '../actions/useractions'
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
        store.dispatch(loginUser(this.state));
        console.log(this.state.username);
    }

    componentWillReceiveProps(){
        console.log("Props at did mount" + JSON.stringify(this.props));
        console.log("Props at did mount" + JSON.stringify(this.state.userDetails));
        let state = store.getState()
        sessionStorage.setItem("isLoggedIn" , "true");
        this.props.history.push({
            pathname: '/userprofile',
            user:state.user.user,
        })
    }
    render(){
        return (
            <div className="container" id="login-form">
			<div className="frm" styles="height: 580px; overflow: scroll">
				<h1>Login</h1>
				
				<form onSubmit={this.loginUserSubmit}>
                    <div className="form-group required">
						<label className='control-label'>Username:</label> <input type="text"
							className="form-control" name="username"  placeholder="Enter username" defaultValue={this.state.username} onChange={this.changeUserName}/>
					</div>
					<div className="form-group required">
						<label className='control-label'>Password:</label> <input type="password"
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

export default connect(mapStateToProps)(LoginForm)