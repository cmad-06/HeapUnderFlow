
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
        store.subscribe( () => {
            console.log("Am I getting called?")
            let state = store.getState();
            this.setState({
                blogs: state.blogReducer.blogs
            });

            this.forceUpdate() 
        });
    /*    store.subscribe(()=>{
            console.log("Am I getting called?")
            let state = store.getState();
            this.setState({
                blogs: state.blogReducer.blogs
            });

            console.log("what state is this? " + JSON.stringify(state.blogReducer.blogs[0]))

        })*/
    }

    render(){   
        return(
             <table>
                <tbody>
                    <tr><th>BlogId</th><th>BlogTitle</th><th>BlogLikes</th></tr>
                    { 
                        this.state.blogs.map(blog => {
                            return <Blog title={ blog.blogTitle } key={blog.blogId} blogId={blog.blogId} likes={blog.blogLikes} >
                            </Blog>
                        }) 
                    }
                </tbody>
            </table>
        );
    }
};


export default Blogs;