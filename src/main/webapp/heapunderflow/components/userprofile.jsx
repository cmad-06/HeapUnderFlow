import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import UserBlogs from './userBlogs.jsx'
import AddBlog from './addBlog.jsx'
import UpdateProfile from './updateprofile.jsx'
import {connect} from 'react-redux'
import store from '../store/store'


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        console.log("UserProfile :" + props.location.user)
        this.state = {
            data : props.location.user,
            user :{},
            key:1

        }
        sessionStorage.setItem("userId" , this.state.data)

        console.log("UserProfile: Received Data : " + this.state.data);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    handleSelect(key) {
        this.setState({ key });
    }
    
    componentWillReceiveProps(){
        console.log("After Update Profile UserProfile: " + JSON.stringify(store.getState));
        this.setState({ key:1 });
        this.forceUpdate();
    }

    handleChangeTab(key){
        this.setState({ key : key })
     }
    
    render(){

        if (!this.state.data){
            return (
                <div/>
            )
        }

        return(
            <div>
                <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
                    <Tab eventKey={1} lazy="false" title="My Blogs">
                        <UserBlogs userId = {this.state.data}/>
                    </Tab>
                    <Tab eventKey={2} lazy="true" title="Create Blog">
                        <AddBlog userId = {this.state.data} user={this.state.user} changeTab={this.handleChangeTab}/>
                    </Tab>
                    <Tab eventKey={3} lazy="true" title="Update Profile" >
                        <UpdateProfile key={this.state.key} changeTab={this.handleChangeTab}/>
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

export default connect(mapStateToProps)(UserProfile)