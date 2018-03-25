
import React from "react";
import Blog from "./Blog.jsx";
import store from "../store/store.js";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {fetchBlogsFromServer} from "../actions/blogactions.js";


class Blogs extends React.Component{
    
    constructor(props){
        super(props);
        console.log("Blogs cons" + JSON.stringify(props));
        this.state ={
            blogs:["hh", "bb"]
        }
        
    }

    componentWillMount(){
        console.log("Blogs" );
        store.dispatch(fetchBlogsFromServer())
        console.log("Blogs Received Data?" );
    }

    render(){
        return(
             <table>
                <tbody>
                    <tr><th>BlogId</th><th>BlogTitle</th><th>BlogLikes</th></tr>
                    { 
                        this.state.blogs.map(blog => {
                            <Blog title={ blog.blogTitle } key={blog.blogId} likes={blog.blogLikes} >
                            </Blog>
                        }) 
                    }
                </tbody>
            </table>
        );
    }
};


export default Blogs;