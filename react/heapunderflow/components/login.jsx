import React from 'react'

class LoginForm extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
        }
        this.changeUserName = this.changeUserName.bind(this);
        this.changePassWord = this.changePassWord.bind(this);
        this.loginUser = this.loginUser.bind(this);
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

    loginUser(e){
        console.log("Login Form Submit Clicked");
        console.log(this.state.username);
    }

    render(){
        return (
            <div class="container" id="registration-form">
			<div class="frm" styles="height: 580px; overflow: scroll">
				<h1>Login</h1>
				
				<form onSubmit={this.loginUser}>
                    <div class="form-group required">
						<label for="username" class='control-label'>Username:</label> <input type="text"
							class="form-control" name="username"  placeholder="Enter username" defaultValue={this.state.username} onChange={this.changeUserName}/>
					</div>
					<div class="form-group required">
						<label for="pwd" class='control-label'>Password:</label> <input type="password"
							class="form-control" name="password" placeholder="Enter password"defaultValue={this.state.password} onChange={this.changePassWord}/>
					</div>
                    <button>Login</button>
                </form>
			</div>
		</div>
        )
    }
}

export default LoginForm