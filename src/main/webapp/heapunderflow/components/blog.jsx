import React from "react";
import store from "../store/store.js";
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
                <td>{ this.props.blogAuthor }</td>
                <td>{ this.props.likes }</td>
                <td>{ this.props.views }</td>
                
            </tr>
            
        );
    }
};

export default Blog;