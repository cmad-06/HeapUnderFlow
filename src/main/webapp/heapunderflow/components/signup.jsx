import React from 'react'
import store from '../store/store.js'
import {addUsertoServer, getUserById} from "../actions/useractions.js";
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
        addUsertoServer(this.state , data =>{
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
        });
        console.log("submitUser Complete");
    }

    /* Implement connect */

    render(){
        
        var signupFormStyle = {
          height: '580px',
          overflow: 'scroll'
        };
        
        return (
            <div className="container" id="registration-form">
			<div className="frm" style={signupFormStyle}>
				<h1>Sign up</h1>
				
				<form onSubmit={this.submitUser}>
                    <div className="form-group required">
						<label id="firstname" className='control-label'>First Name:</label> 
                        <input type="text"
							className="form-control" name="firstname"  placeholder="Enter firstname" defaultValue={this.state.firstName} onChange={this.changeFirstName} />
					</div>
                    <div className="form-group required">
						<label id="lastname" className='control-label'>Last Name:</label> <input type="text"
							className="form-control" name="lastname" placeholder="Enter lastname" defaultValue={this.state.lastName} onChange={this.changeLastName}/>
					</div>
					<div className="form-group required">
						<label id="username" className='control-label'>Username:</label> <input type="text"
							className="form-control" name="username"  placeholder="Enter username" defaultValue={this.state.username} onChange={this.changeUserName}/>
					</div>
					<div className="form-group required">
						<label id="email" className='control-label'>Email:</label> <input type="email"
							className="form-control" name="email" placeholder="Enter email" defaultValue={this.state.email} onChange={this.changeEmail}/>
					</div>
					<div className="form-group required">
						<label id="pwd" className='control-label'>Password:</label> <input type="password"
							className="form-control" name="password" placeholder="Enter password" defaultValue={this.state.password} onChange={this.changePassWord}/>
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

export default connect(mapStateToProps, {addUsertoServer, getUserById})(SignupForm)