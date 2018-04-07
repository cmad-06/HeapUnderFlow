import React from 'react'
import Blog from "./Blog.jsx";
import store from "../store/store.js";
import { connect } from 'react-redux';
import {fetchUserBlogsFromServer} from "../actions/useractions.js";
import {Table} from 'react-bootstrap'

class UserBlogs extends React.Component{
    constructor(props){
        super(props)
        console.log("User Id Sent : " + this.props.userId)
        this.state = {
            data : this.props.userId
        }
    //    console.log("User Id Sent : " + this.state.data)
    }

    renderList(){
        console.log("Props : " + JSON.stringify(this.props.blogs))
        if (this.props.blogs != undefined){
            return this.props.blogs.map((blog) => {
                return <Blog title={ blog.blogTitle } key={blog.blogId} blogId={blog.blogId} likes={blog.blogLikes} >
                </Blog>
            }) 
        }
    }

    componentWillMount(){
        console.log("Blogs" );
        store.dispatch(fetchUserBlogsFromServer(this.state.data));
        console.log("Blogs Received Data?" );
    }

    render(){
        return (
            <Table className="table table-striped table-condensed" >
            <thead>
                <tr>
                    <th>BlogTitle</th>
                    <th>BlogId</th>
                    <th>BlogLikes</th>
                </tr>
             </thead>
            <tbody>
             {this.renderList()}
            </tbody>
        </Table>
        )
    }
}

function mapStateToProps(state){
    console.log(JSON.stringify("State Details : " + JSON.stringify(state)))
    return {
        blogs:state.user.blogs
    }
}
export default connect(mapStateToProps)(UserBlogs);