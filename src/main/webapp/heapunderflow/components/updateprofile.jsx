import React from 'react'
import {connect} from 'react-redux'
import store from '../store/store'
import {updateUsertoServer} from '../actions/useractions'

class UpdateProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmpassword:"",
        }

        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassWord = this.changePassWord.bind(this);
        this.changeConfirmPassWord = this.changeConfirmPassWord.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    changeFirstName(e){
        this.setState({
            firstName:e.target.value
        })
    }

    changeLastName(e){
        this.setState({
            lastName:e.target.value
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

    changeConfirmPassWord(e){
        this.setState({
            confirmpassword:e.target.value
        })
    }

    updateUser(e){
        e.preventDefault()
        let lUser = JSON.parse(sessionStorage.getItem("user"));
        console.log("Form Submit Clicked" + JSON.stringify(lUser));

        if (lUser.firstName != this.state.firstName)
        {
            lUser.firstName = this.state.firstName;
        }
        if (lUser.lastName != this.state.lastName)
        {
            lUser.lastName = this.state.lastName;
        }
        if (lUser.email != this.state.email)
        {
            lUser.email = this.state.email;
        }
        if (this.state.confirmpassword === this.state.password)
        {
            lUser.password = this.state.password;
        }
        console.log("Form Submit Clicked" + JSON.stringify(lUser));
        store.dispatch(updateUsertoServer(lUser));
    }

    componentWillReceiveProps(){
        console.log("After Update Profile : " + JSON.stringify(store.getState));
    }

    render(){
        return (
            <div>
                <form id="profileupdateform" onSubmit={this.updateUser}>
					<p className="form-group">
						<label for="firstname" className='control-label'>First Name:</label> <input type="text"
							className="form-control" name="firstname1" id="changefirstname" placeholder="Enter firstname" defaultValue={this.state.firstName} onChange={this.changeFirstName}/>
					</p>
					<p className="form-group">
						<label for="lastname" className='control-label'>Last Name:</label> <input type="text"
							className="form-control" name="lastname1" id="changelastname" placeholder="Enter lastname" defaultValue={this.state.lastName} onChange={this.changeLastName} />
					</p>

					<p className="form-group">
						<label for="email" className='control-label'>Email:</label> <input type="email"
							className="form-control" name="email1" id="changeemail" placeholder="Enter email" defaultValue={this.state.email} onChange={this.changeEmail} />
					</p>
					<p className="form-group">
						<label for="pwd" className='control-label'>Password:</label> <input type="password"
							className="form-control" name="password1" id="changepassword" placeholder="Enter password" defaultValue={this.state.password} onChange={this.changePassWord}/>
					</p>
					<p className="form-group">
						<label for="pwd" className='control-label'>Confirm Password:</label> <input type="password"
							className="form-control" name="password2" id="changepassword2" placeholder="Confirm password" defaultValue={this.state.confirmpassword} onChange={this.changeConfirmPassWord}/> 
					</p>
					<p className="form-group">
						<button id="profileupdate" type="submit" className="btn btn-success btn-lg">Submit</button>
					</p>
				</form>
            </div>
        )
    }
} 

function mapStateToServer(state){
    return {
        user:state.user.user
    }
}

export default connect(mapStateToServer)(UpdateProfile)