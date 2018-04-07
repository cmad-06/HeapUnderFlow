import React from 'react'
import store from '../store/store'
import { connect } from 'react-redux'


class BlogPage extends React.Component{
    
    constructor(props){
        super(props);
        console.log("BlogPage props : " + JSON.stringify(props))
    }


    componentWillMount(){
        console.log(this.props.blogId);
        dispatch(store.fetchBlogById(this.props.blogId))
    }

    componentWillReceiveProps(){

    }

    render(){
        return (
            <div>
                <div>
                    <h1>{this.props.blog.blogTitle}</h1>
                    <p> {this.props.blog.blogText}</p>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state){
    console.log(this.props.user.blog)
}

export default connect(mapStateToProps)(BlogPage)