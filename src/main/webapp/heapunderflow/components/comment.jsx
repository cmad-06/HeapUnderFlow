import React from "react";
import store from "../store/store.js";
import { Link } from "react-router-dom"

class Comment extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        console.log("Comment Rendering" );
       
    }

    render(){
        return(
            
            <tr className='table-row'>      
                <td>{ this.props.commentText }</td>
                <td>{ this.props.user }</td>
            </tr>
            
        );
    }
};

export default Comment;