import React from 'react'
import store from '../store/store.js'
import {addUsertoServer} from "../actions/useractions.js";
import { connect } from 'react-redux'


class SignupForm extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            firstName:"",
            lastName:"",
            username:"",
            email:"",
            password:"",
        }

        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassWord = this.changePassWord.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    changeFirstName(e){
        this.setState({
            firstName:e.target.value
        })
        console.log("Firstname :" + this.state.firstName);
    }

    changeLastName(e){
        this.setState({
            lastName:e.target.value
        })
    }

    changeUserName(e){
        this.setState({
            username:e.target.value
        })
    }

    changeEmail(e){
        this.setState({
            email:e.target.value
        })
    }

    changePassWord(e){
        this.setState({
            password:e.target.value
        })
    }

    submitUser(e){
        e.preventDefault()
        console.log("Form Submit Clicked");
       store.dispatch(addUsertoServer(this.state));
        console.log("submitUser Complete");
    }

    componentWillReceiveProps(){
        console.log("Signup Received Props : " + JSON.stringify(this.props))
        let state = store.getState()
        sessionStorage.setItem("isLoggedIn" , "true");
        this.props.history.push({
            pathname: '/userprofile',
            user:state.user.user
        })
    }

    /* Implement connect */

    render(){
        return (
            <div class="container" id="registration-form">
			<div class="frm" styles="height: 580px; overflow: scroll">
				<h1>Sign up</h1>
				
				<form onSubmit={this.submitUser}>
                    <div class="form-group required">
						<label for="firstname" class='control-label'>First Name:</label> 
                        <input type="text"
							class="form-control" name="firstname"  placeholder="Enter firstname" defaultValue={this.state.firstName} onChange={this.changeFirstName} />
					</div>
                    <div class="form-group required">
						<label for="lastname" class='control-label'>Last Name:</label> <input type="text"
							class="form-control" name="lastname" placeholder="Enter lastname" defaultValue={this.state.lastName} onChange={this.changeLastName}/>
					</div>
					<div class="form-group required">
						<label for="username" class='control-label'>Username:</label> <input type="text"
							class="form-control" name="username"  placeholder="Enter username" defaultValue={this.state.username} onChange={this.changeUserName}/>
					</div>
					<div class="form-group required">
						<label for="email" class='control-label'>Email:</label> <input type="email"
							class="form-control" name="email" placeholder="Enter email" defaultValue={this.state.email} onChange={this.changeEmail}/>
					</div>
					<div class="form-group required">
						<label for="pwd" class='control-label'>Password:</label> <input type="password"
							class="form-control" name="password" placeholder="Enter password" defaultValue={this.state.password} onChange={this.changePassWord}/>
					</div>
                    <button>Submit</button>
                </form>
			</div>
		</div>
        )
    }
}

function mapStateToProps(state){
    return {
        userDetails: state.user.user
    }
}

export default connect(mapStateToProps)(SignupForm)