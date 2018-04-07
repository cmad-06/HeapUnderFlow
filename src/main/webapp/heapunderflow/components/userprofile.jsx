import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import UserBlogs from './userBlogs.jsx'
import AddBlog from './addBlog.jsx'
import UpdateProfile from './updateprofile.jsx'
import {connect} from 'react-redux'
import {getUserById} from '../actions/useractions'
import store from '../store/store'


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        console.log("UserProfile :" + props.location.user)
        this.state = {
            data : JSON.parse(props.location.user),
            user :{}
        }
        sessionStorage.setItem("userId" , this.state.data.userId)
        sessionStorage.setItem("token" ,this.state.data.token)
        console.log("UserProfile: Received Data : " + this.state.data);
    }

    componentWillMount(){
        store.dispatch(getUserById(this.state.data.userId));
    }

    componentWillReceiveProps(){
        console.log("UserProfile : componentWillReceiveProps" + JSON.stringify(this.props.user))
        this.setState({
            user:this.props.user
        })
        sessionStorage.setItem("user" , JSON.stringify(this.props.user));
    }

    render(){
        return(
            <div>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} lazy="false" title="My Blogs">
                        <UserBlogs userId = {this.state.data.userId}/>
                    </Tab>
                    <Tab eventKey={2} lazy="true" title="Create Blog">
                        <AddBlog userId = {this.state.data.userId} user={this.state.user}/>
                    </Tab>
                    <Tab eventKey={3} lazy="true" title="Update Profile">
                        <UpdateProfile />
                    </Tab>
                </Tabs>
            </div>
        )
    }

/*
    render(){
        return (
            <div class="tabs-basic">

                <ul>
                    <li><a class="tab-active" data-index="0" href="#">My Blogs</a>
                    </li>
                    <li><a data-index="1" href="#">Add Blog</a></li>
                    <li><a data-index="2" href="#">Update Profile</a></li>
                </ul>
                <div class="tabs-content-placeholder">

                    <div class="tab-content-active">
                        <p class="table-user">
                        <table cellspacing="0" id="records_table">
                            <tr>
                                <th>Blog Title</th>
                                <th width="230">Total Likes</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </table>
                        </p>

                    </div>
                    <div>
                        <form id="addblogform">

                            <p class="form-group required">
                                <label for="blogTitle" class='control-label'>Blog Title:</label>
                                <input type="text" class="form-control" name="blogtitle"
                                    id="blogtitle" placeholder="Enter Blog Title " />
                            </p>

                            <p class="form-group required">
                                <label for="blogText" class='control-label'>Blog Text:</label>
                                <textarea rows="4" cols="50" class="form-control"
                                    name="blogtext" id="blogtext" placeholder="Enter Blog Text"></textarea>
                            </p>

                            <p class="form-group">
                                <button id="addblog" type="submit" class="btn btn-success btn-lg">Submit</button>
                            </p>
                        </form>
				    </div>
                    <div>
					<form id="profileupdateform">
					<p class="form-group">
						<label for="firstname" class='control-label'>First Name:</label> <input type="text"
							class="form-control" name="firstname1" id="changefirstname" placeholder="Enter firstname" />
					</p>
					<p class="form-group">
						<label for="lastname" class='control-label'>Last Name:</label> <input type="text"
							class="form-control" name="lastname1" id="changelastname" placeholder="Enter lastname" />
					</p>

					<p class="form-group">
						<label for="email" class='control-label'>Email:</label> <input type="email"
							class="form-control" name="email1" id="changeemail" placeholder="Enter email" />
					</p>
					<p class="form-group">
						<label for="pwd" class='control-label'>Password:</label> <input type="password"
							class="form-control" name="password1" id="changepassword" placeholder="Enter password" />
					</p>
					<p class="form-group">
						<label for="pwd" class='control-label'>Confirm Password:</label> <input type="password"
							class="form-control" name="password2" id="changepassword2" placeholder="Confirm password" />
					</p>
					<p class="form-group">
						<button id="profileupdate" type="submit" class="btn btn-success btn-lg">Submit</button>
					</p>
				</form>
				</div>


                </div>    
            </div>
			
	

        )
    }
*/
}

function mapStateToProps(state){
    return {
        user:state.user.user
    }
}

export default connect(mapStateToProps)(UserProfile)