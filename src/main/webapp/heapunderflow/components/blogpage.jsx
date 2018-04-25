import React from 'react'
import store from '../store/store'
import { connect } from 'react-redux'
import { fetchBlogByIdFromServer} from '../actions/blogactions'
import { updateBlogById} from '../actions/blogactions'
import { addComment, getCommentsByBlogId} from '../actions/commentactions'
import { deleteUserBlogById} from '../actions/useractions'
import Comment from "./comment.jsx";
import {Link} from 'react-router-dom'
import {Button, Table, PanelGroup} from 'react-bootstrap'
import { Field, reduxForm} from 'redux-form'

//import Comments from './comments.jsx'

class BlogPage extends React.Component{
    
    constructor(props){
        super(props);
        console.log("BlogPage props : " + JSON.stringify(props))
        this.state = {
            editBlog:false,
            comment:'',
            userId:'',
            user:{},
            comments:''
        }
        this.handleLikeButton = this.handleLikeButton.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleUpdateBlog = this.handleUpdateBlog.bind(this);
        this.handleDeleteBlog = this.handleDeleteBlog.bind(this);
        this.changeComment = this.changeComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        
        const { blogId } = this.props.match.params;
        this.props.fetchBlogByIdFromServer(blogId);
        const userId = sessionStorage.getItem("userId")
        this.setState ({
            userId : userId,
            liked:false
        })
        console.log("sessionStorage.getItem()  user " + sessionStorage.getItem("user"))
        this.setState ({
            user : JSON.parse(sessionStorage.getItem("user"))
        })

        this.props.getCommentsByBlogId(blogId, data=>{
            this.setState ({
                comments : data.data
            })
            this.forceUpdate();
        });

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
        if (this.state.liked){
            blog.blogLikes = blog.blogLikes-1;
        }
        else {
            blog.blogLikes = blog.blogLikes+1;
        }
        this.setState({
            liked: !this.state.liked
          });
          
        console.log("Likes " + blog.blogLikes)
        updateBlogById(blog, data =>{
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
        deleteUserBlogById(this.state.userId,blog.blogId, data =>{
            this.props.history.push("/")
        });
    }

    handleEditButton(){
        
        this.setState({editBlog:true})
            this.forceUpdate();

    }

    handleSubmit(e){
        e.preventDefault()
        const commentDetails = {"comment":this.state.comment, 
                                "blogId":this.props.blog.blogId,
                                "userId":this.state.user.username
                                }
        addComment(commentDetails);
        console.log("Comment Form Submitted : " + JSON.stringify(commentDetails))
    }

    changeComment(e){
        this.setState({
            comment:e.target.value
        })
    }

    renderList(){
        console.log("Props renderList: " + JSON.stringify(this.state.comments))
        if ( this.state.comments){
            return this.state.comments.map((comment) => {
                return (<Comment commentText={ comment.comment } key={comment.commentId} user={comment.userId} >
                </Comment>)
           }) 
        }
    }
    
    render(){

        if (!this.props.blog){
            return (
                <div/>
            )
        }
        console.log("this.state.userId  + " + this.state.userId )
        const showDeleteBlogButton = (this.state.userId === null ) ? <div/> :
        this.props.blog.blogAuthor === this.state.user.username ? <Button bsStyle="primary" onClick= {this.handleDeleteBlog}>Delete Blog</Button> : <div/>

        const showEditBlogButton = this.state.userId === null ? <div/> :
        this.props.blog.blogAuthor === this.state.user.username ? <Button bsStyle="primary" onClick= {this.handleEditButton}>Edit Blog</Button> : <div/>
        
        const likeLabel = this.state.liked ? 'Unlike' : 'Like'
        const showAddCommentsDiv = this.state.userId === null ? <div/>:
        <div id="comments" >
                    <form onSubmit={this.handleSubmit}>
                        <p className="form-group">
                            <label className='control-label'>Add Comment :</label> <input type="text"
                                className="form-control" name="firstname1" id="changefirstname" placeholder="Max 150 characters" defaultValue={this.state.comment} onChange={this.changeComment}/>
                        </p>
                        <button type="submit" className="btn btn-primary" >Submit</button>
                    </form>
                 </div>

        const commentsDiv = <PanelGroup accordion
        id="accordion-controlled-example" >
                                
                                {this.renderList()}
                            </PanelGroup>

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
                        <Button bsStyle="primary" onClick= {this.handleLikeButton} style={{padding:'5px'}}>
                            <span className="glyphicon glyphicon-thumbs-up"></span>{likeLabel} {this.props.blog.blogLikes}
                        </Button>
                        <Button bsStyle="primary" >
                            <span className="glyphicon"></span>Views {this.props.blog.blogViews}
                        </Button>
                        {showEditBlogButton}
                        {showDeleteBlogButton}
                        </p>
                    </div>
                </div>
                
                {showAddCommentsDiv}
                </font>
                <div ><font face="verdana" color="white">
                    <h3>Comments</h3>
                    </font>
                    {commentsDiv}
                    </div>
                
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
        blog : state.blogs.blog,
        comments : state.comments.comments
    }
}

BlogPage = connect(mapStateToProps, {fetchBlogByIdFromServer, updateBlogById, deleteUserBlogById, addComment,getCommentsByBlogId })(BlogPage)

export default BlogPage