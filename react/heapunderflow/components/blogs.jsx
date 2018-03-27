
import React from "react";
import Blog from "./Blog.jsx";
import store from "../store/store.js";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {fetchBlogsFromServer} from "../actions/blogactions.js";
import {Table} from 'react-bootstrap'


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
        store.subscribe( () => {
            console.log("Am I getting called?")
            let state = store.getState();
            this.setState({
                blogs: state.blogReducer.blogs
            });

            this.forceUpdate() 
        });
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
                 
                    { 
                        this.state.blogs.map(blog => {
                            return <Blog title={ blog.blogTitle } key={blog.blogId} blogId={blog.blogId} likes={blog.blogLikes} >
                            </Blog>
                        }) 
                    }
                </tbody>
            </Table>
        );
    }
};


export default Blogs;