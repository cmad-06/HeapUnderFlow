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
        console.log("User  from sessionStorage.getItem : " + lUser);
        console.log("User  from sessionStorage.getItem : " + JSON.stringify(lUser));
        console.log("Username  from sessionStorage.getItem : " + lUser.username);
        
        console.log("User Id from sessionStorage.getItem : " + sessionStorage.getItem("userId")); 
        let date = Date.now();
        console.log("Date is :" + date);
        
        this.setState({blogCreation:date} , ()=>{
            this.setState({
                blogAuthor:lUser.username
            } , ()=> {
                console.log("Form Submit Clicked" , JSON.stringify(this.state));
                store.dispatch(addBlogtoServer(this.state));
                console.log("submitUser Complete");
            })
        })
    }

    componentWillReceiveProps(){
        console.log("componentWillReceiveProps Complete");
    }

    render(){
        return (
            <div>
                        <form id="addblogform" onSubmit={this.submitBlog}>

                            <p class="form-group required">
                                <label for="blogTitle" class='control-label'>Blog Title:</label>
                                <input type="text" class="form-control" name="blogtitle"
                                    id="blogtitle" placeholder="Enter Blog Title " defaultValue={this.state.blogTitle} onChange={this.changeBlogTitle} />
                            </p>

                            <p class="form-group required">
                                <label for="blogText" class='control-label'>Blog Text:</label>
                                <textarea rows="4" cols="50" class="form-control"
                                    name="blogtext" id="blogtext" placeholder="Enter Blog Text" defaultValue={this.state.blogText} onChange={this.changeBlogText}></textarea>
                            </p>

                            <p class="form-group">
                                <button id="addblog" type="submit" class="btn btn-success btn-lg">Submit</button>
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

export default connect(mapStateToProps)(AddBlog)