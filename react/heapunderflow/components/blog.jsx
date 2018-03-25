import React from "react";
import store from "../store/store.js";
import {Update} from "../actions/blogActions.js";

class Blog extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        console.log("Blog Rendering" );
       
    }

    render(){
        return(
            <tr>
                <td>{ this.props.blogId }</td>
                <td>{ this.props.key }</td>
                <td>{ this.props.likes }</td>

            </tr>
        );
    }
};

export default Blog;