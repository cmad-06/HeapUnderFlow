
import React from "react";
import Blog from "./Blog.jsx";
import store from "../store/store.js";
import { connect } from 'react-redux';
import {fetchBlogsFromServer} from "../actions/blogactions.js";
import {Table} from 'react-bootstrap'


class Blogs extends React.Component{
    
    constructor(props){
        super(props);
        
        console.log("Blogs cons" + JSON.stringify(props));
        
    }

    renderList(){
        console.log("Props : " + JSON.stringify(this.props.blogs.blogs))
        return this.props.blogs.map((blog) => {
            return <Blog title={ blog.blogTitle } key={blog.blogId} blogId={blog.blogId} likes={blog.blogLikes} >
            </Blog>
        }) 
    }

    componentWillMount(){
        console.log("Blogs" );
        store.dispatch(fetchBlogsFromServer())
        console.log("Blogs Received Data?" );
    }

    render(){   
        return(
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
        );
    }
};

function mapStateToProps(state){
    console.log(JSON.stringify("State Details : " + JSON.stringify(state)))
    return {
        blogs:state.blogs.blogs
    }
}
export default connect(mapStateToProps)(Blogs);