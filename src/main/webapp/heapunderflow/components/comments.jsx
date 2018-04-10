
import React from "react";
import Comment from "./comment.jsx";
import { connect } from 'react-redux';
import {getCommentsByBlogId} from "../actions/commentactions";
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import BootstrapTable from 'react-bootstrap-table-next';

class Comments extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            blogId:this.props.blogId
        }
        console.log("Comments props" + JSON.stringify(props));
       // this.onClickHandler = this.onClickHandler.bind(this);
    }

    renderList(){
        console.log("Props : " + JSON.stringify(this.props.comments))
        return this.props.comments.map((comment) => {
            return <Comment commentText={ comment.comment } key={comment.commentId} user={comment.userId} >
            </Comment>
        }) 
    }

    componentWillMount(){
        console.log("Comments" );
        this.props.getCommentsByBlogId(this.state.blogId);
        console.log("Comments Received Data?" );
    }
    
    render(){   

        if (!this.props.comments){
            return (
                <div>No Comments Found</div>
            )
        }
        return(
             <Table className="table" >
                <thead>
                    <tr>
                        <th>Comments</th>
                        <th>Posted By</th>
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
    console.log(JSON.stringify("State Details comments.jsx : " + JSON.stringify(state)))
    return {
        comments:state.comments.comments
    }
}

export default connect(mapStateToProps,{getCommentsByBlogId})(Comments);