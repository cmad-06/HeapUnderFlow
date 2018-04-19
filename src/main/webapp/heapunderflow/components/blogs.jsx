
import React from "react";
import Blog from "./Blog.jsx";
import { connect } from 'react-redux';
import {fetchBlogsFromServer,searchBlogsByKey } from "../actions/blogactions.js";
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import BootstrapTable from 'react-bootstrap-table-next';

class Blogs extends React.Component{
    
    constructor(props){
        super(props);
    }

    renderList(){
        console.log("Props : " + JSON.stringify(this.props.blogs))
        return this.props.blogs.map((blog) => {
            return <Blog title={ blog.blogTitle } key={blog.blogId} blogId={blog.blogId} blogAuthor={blog.blogAuthor} likes={blog.blogLikes} views={blog.blogViews}>
            </Blog>
        }) 
    }

    componentWillMount(){
        
        const { search } = this.props.history.location
        const searchString = search.split("=")[1]
        console.log("PROPS " + searchString);
        if (searchString){
            this.props.searchBlogsByKey(searchString)
        }
        else {
            this.props.fetchBlogsFromServer();
        }
        console.log("Blogs Received Data?" );
    }
    render(){   
        
        if (!this.props.blogs){
            return (
                <div/>
            )
        }
                
        var blogTds = {
          color: 'white'
        };
                
        return(
             <Table bsClass="table" className='table-users'  >
                <thead>
                    <tr style={{font:'verdena', color:'white'}}>
                        <th>Blog Title</th>
                        <th>Author</th>
                        <th>Blog Likes</th>
                        <th>Blog Views</th>
                    </tr>
                 </thead>
                <tbody style={blogTds}>
                 {this.renderList()}
                </tbody>
            </Table>
        );
    }
    
};

function mapStateToProps(state){
  //  console.log(JSON.stringify("State Details blogs.jsx : " + JSON.stringify(state)))
    return {
        blogs:state.blogs.blogs
    }
}



export default connect(mapStateToProps,{fetchBlogsFromServer, searchBlogsByKey})(Blogs);