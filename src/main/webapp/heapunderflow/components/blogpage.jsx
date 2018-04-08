import React from 'react'
import store from '../store/store'
import { connect } from 'react-redux'
import { fetchBlogByIdFromServer} from '../actions/blogactions'
import { updateBlogById} from '../actions/blogactions'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
class BlogPage extends React.Component{
    
    constructor(props){
        super(props);
        console.log("BlogPage props : " + JSON.stringify(props))
        this.state = {
            editBlog:false
        }
        this.handleLikeButton = this.handleLikeButton.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleUpdateBlog = this.handleUpdateBlog.bind(this);
    }


    componentDidMount(){
        
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

    handleEditButton(){
        
        this.setState({editBlog:true})
            this.forceUpdate();

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
                    
                    </p>
                </div>
                </font>
            </div>
        )
    }

}

function mapStateToProps(state){
//    console.log(this.props.user.blog)
    return {
        blog : state.blogs.blog
    }
}

export default connect(mapStateToProps, {fetchBlogByIdFromServer, updateBlogById})(BlogPage)