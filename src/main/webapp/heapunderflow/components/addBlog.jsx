import React from 'react'
import {connect} from 'react-redux'
import {addBlogtoServer} from '../actions/useractions'
import store from '../store/store'

class AddBlog extends React.Component{
    
    constructor (props){
        super(props)
        console.log("AddBlog : props" + JSON.stringify(props))
        this.state  = {
            userId : this.props.userId,
            blogTitle : "",
            blogAuthor:this.props.user,
            blogText:"",
            blogCreation:""
        }
        this.changeBlogTitle=this.changeBlogTitle.bind(this);
        this.changeBlogText=this.changeBlogText.bind(this);
        this.submitBlog = this.submitBlog.bind(this);

        console.log("User Id from sessionStorage.getItem : " + sessionStorage.getItem("token")); 
    }

    changeBlogTitle(e){
        
        this.setState({
            blogTitle:e.target.value
        })
        
    }

    changeBlogText(e){
        
        this.setState({
            blogText:e.target.value
        })
    }

    submitBlog(e){
        e.preventDefault();
        let lUser = JSON.parse(sessionStorage.getItem("user"));
        
        console.log("User Id from sessionStorage.getItem : " + sessionStorage.getItem("userId")); 
        let date = Date.now();
        
        this.setState({blogCreation:date} , ()=>{
            this.setState({
                blogAuthor:lUser.username
            } , ()=> {
                addBlogtoServer(this.state, ()=>{
                    this.props.changeTab(1)
                    this.forceUpdate()
                });
                console.log("submitUser Complete");
            })
        })
    }

    render(){
       
        return (
            <div>
                        <form id="addblogform" onSubmit={this.submitBlog}>

                            <p className="form-group required">
                                <label for="blogTitle" className='control-label'>Blog Title:</label>
                                <input type="text" className="form-control" name="blogtitle"
                                    id="blogtitle" placeholder="Enter Blog Title " defaultValue={this.state.blogTitle} onChange={this.changeBlogTitle} />
                            </p>

                            <p className="form-group required">
                                <label for="blogText" className='control-label'>Blog Text:</label>
                                <textarea rows="4" cols="50" className="form-control"
                                    name="blogtext" id="blogtext" placeholder="Enter Blog Text" defaultValue={this.state.blogText} onChange={this.changeBlogText}></textarea>
                            </p>

                            <p className="form-group">
                                <button id="addblog" type="submit" className="btn btn-success btn-lg">Submit</button>
                            </p>
                        </form>
				    </div>
        )
    }
}

function mapStateToProps(state){
    console.log("Add Blogs MSTP : "  + JSON.stringify(state))
    
       return {
            success: state
        }
    
}

export default connect(mapStateToProps, {addBlogtoServer})(AddBlog)