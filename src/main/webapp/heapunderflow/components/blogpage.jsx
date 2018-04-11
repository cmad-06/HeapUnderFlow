import React from 'react'
import store from '../store/store'
import { connect } from 'react-redux'
import { fetchBlogByIdFromServer, deleteBlogById} from '../actions/blogactions'
import { updateBlogById} from '../actions/blogactions'
import { addComment, getCommentsByBlogId} from '../actions/commentactions'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { Field, reduxForm} from 'redux-form'
import Comments from './comments.jsx'

class BlogPage extends React.Component{
    
    constructor(props){
        super(props);
        console.log("BlogPage props : " + JSON.stringify(props))
        this.state = {
            editBlog:false,
            comment:''
        }
        this.handleLikeButton = this.handleLikeButton.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleUpdateBlog = this.handleUpdateBlog.bind(this);
        this.handleDeleteBlog = this.handleDeleteBlog.bind(this);
        this.renderField = this.renderField.bind(this);
        this.changeComment = this.changeComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        
        const { blogId } = this.props.match.params;
        this.props.fetchBlogByIdFromServer(blogId);
    }

    componentWillReceiveProps(){
        if ( this.props.blog){
            this.setState ({
                blog : this.props.blog
            })
            console.log ("BLLOG : " + this.state.blog)
        }
    }

    handleLikeButton(){
        let blog = this.props.blog
        blog.blogLikes = blog.blogLikes+1;
        console.log("Likes " + blog.blogLikes)
        updateBlogById(blog, data =>{
            console.log("Hello")
            this.forceUpdate();
        });
    }

    handleUpdateBlog(){
        let blog = this.props.blog
        blog.blogText = blog.blogText+" Updated Blog";
        console.log("Updated Blog " +  blog.blogText)
        updateBlogById(blog, data =>{
            this.setState({editBlog:false})
            this.forceUpdate();
        });
    }

    handleDeleteBlog(){
        let blog = this.props.blog
        console.log("Deleting Blog : " + blog.blogId)
        deleteBlogById(blog.blogId, data =>{
            this.props.history.push("/")
        });
    }

    handleEditButton(){
        
        this.setState({editBlog:true})
            this.forceUpdate();

    }

    renderField(field){
        console.log("renderField = " + JSON.stringify(field))
        return (
            <div>
            </div>
        )
    }

    handleSubmit(e){
        e.preventDefault()
        const commentDetails = {"comment":this.state.comment, 
                                "blogId":this.props.blog.blogId,
                                "userId":this.props.blog.blogAuthor
                                }
        addComment(commentDetails);
        console.log("Comment Form Submitted : " + JSON.stringify(commentDetails))
    }

    changeComment(e){
        this.setState({
            comment:e.target.value
        })
    }

    render(){
        console.log(this.props.history)
        if (!this.props.blog){
            return (
                <div></div>
            )
        }
        if (this.state.editBlog){
            return (
                <div>
                    <Button bsStyle="primary" onClick= {this.handleUpdateBlog}>Update Blog</Button>
                </div>
                
            )
        }
        return (
            
            <div><font face="verdana" color="white">
                <div>
                    <Link to="/" >Back</Link>
                    <div>
                        <h1>{this.props.blog.blogTitle}</h1>
                        <p> {this.props.blog.blogText}</p>
                    </div>
                    <div>

                        <p>Author : {this.props.blog.blogAuthor}  
                    
                        <Button bsStyle="primary" onClick= {this.handleLikeButton}>
                            <span className="glyphicon glyphicon-thumbs-up"></span>Like {this.props.blog.blogLikes}
                        </Button>

                        <Button bsStyle="primary" onClick= {this.handleEditButton}>Edit Blog</Button>
                        <Button bsStyle="primary" onClick= {this.handleDeleteBlog}>Delete Blog</Button>
                        
                        </p>
                    </div>
                </div>
                <div>
                <div id="comments" >
                    <form onSubmit={this.handleSubmit}>
                        <p className="form-group">
                            <label className='control-label'>Add Comment :</label> <input type="text"
                                className="form-control" name="firstname1" id="changefirstname" placeholder="Max 150 characters" defaultValue={this.state.comment} onChange={this.changeComment}/>
                        </p>
                        <button type="submit" className="btn btn-primary" >Submit</button>
                    </form>
                    <div>
                    <Comments blogId={this.props.blog.blogId}/>
                    </div>
                 </div>
                    </div>
                </font>
            </div>
        )
    }

}

function validate(values){
    const errors={};

    if ( !values.newComment ){
        errors.title = "Enter a comment!!"
    }

    return errors;
}

function mapStateToProps(state){
//    console.log(this.props.user.blog)
    return {
        blog : state.blogs.blog
    }
}

BlogPage = connect(mapStateToProps, {fetchBlogByIdFromServer, updateBlogById, deleteBlogById, addComment,getCommentsByBlogId })(BlogPage)
/*
BlogPage = reduxForm ({
    validate,
    form:"PostCommentForm"
})(BlogPage)*/

 export default BlogPage