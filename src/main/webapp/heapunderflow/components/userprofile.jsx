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
        getUserById(this.state.data.userId);
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


}

function mapStateToProps(state){
    return {
        user:state.user.user
    }
}

export default connect(mapStateToProps, {getUserById})(UserProfile)