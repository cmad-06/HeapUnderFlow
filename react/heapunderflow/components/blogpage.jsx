import React from 'react'
import store from '../store/store'
import { connect } from 'react-redux'
import { fetchBlogByIdFromServer} from '../actions/blogactions'
import {Link} from 'react-router-dom'

class BlogPage extends React.Component{
    
    constructor(props){
        super(props);
        console.log("BlogPage props : " + JSON.stringify(props))
    }


    componentDidMount(){
        
        const { blogId } = this.props.match.params;
        this.props.fetchBlogByIdFromServer(blogId);
    }

    componentWillReceiveProps(){

    }

    render(){
        console.log(this.props.history)
        if (!this.props.blog){
            return (
                <div></div>
            )
        }
        return (
            
            <div>
                <Link to="/" >Back</Link>
                <div>
                    <h1>{this.props.blog.blogTitle}</h1>
                    <p> {this.props.blog.blogText}</p>
                </div>
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

export default connect(mapStateToProps, {fetchBlogByIdFromServer})(BlogPage)