import React from "react";
import store from "../store/store.js";
import {Update} from "../actions/blogActions.js";
import { Link } from "react-router-dom"

class Blog extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        console.log("Blog Rendering" );
       
    }

    render(){
        return(
            
            <tr className='table-row'>
                
                <td><Link to={`/blogPage/${this.props.blogId}`}>{ this.props.title }</Link></td>
                
                <td>{ this.props.blogId }</td>
                <td>{ this.props.likes }</td>
                
            </tr>
            
        );
    }
};

export default Blog;