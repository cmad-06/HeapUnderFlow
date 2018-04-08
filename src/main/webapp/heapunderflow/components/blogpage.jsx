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
            blog:""
        }
        this.handleClick = this.handleClick.bind(this);
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

    handleClick(){
        
    
        let blog = this.props.blog
        blog.blogLikes = blog.blogLikes+1;
        console.log("Likes " + blog.blogLikes)
        updateBlogById(blog, data =>{
            console.log("Hello")
            this.forceUpdate();
        });
    }

    render(){
        console.log(this.props.history)
        if (!this.props.blog){
            return (
                <div></div>
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
                   
                    <Button bsStyle="primary" 
                        onClick= {this.handleClick}
                    > <span className="glyphicon glyphicon-thumbs-up"></span>Like {this.props.blog.blogLikes}
                        
                    </Button>
                    
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