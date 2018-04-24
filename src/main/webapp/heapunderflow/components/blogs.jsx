
import React from "react";
import Blog from "./Blog.jsx";
import { connect } from 'react-redux';
import {fetchBlogsFromServer,fetchBlogsFromServerForPage,searchBlogsByKey } from "../actions/blogactions.js";
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import BootstrapTable from 'react-bootstrap-table-next';

class Blogs extends React.Component{

//--------------------------------------------------------------------------
    
    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.state = {
        	page: 1
        }  
    }

//--------------------------------------------------------------------------
    
     handleNext(){
    	alert("Next clicked");
    	const currentPage = this.state.page + 1;
    	alert("moving to page: " + currentPage);
    	this.setState((prevState) => {
            return { 
                page: prevState.page + 1
            }
        });
        
        fetchBlogsFromServerForPage(currentPage);
    }
    
//--------------------------------------------------------------------------
    handlePrev(){
    	console.log("Prev clicked");
    	alert("Prev clicked Fresh");
    	this.setState((prevState) => {
            return { 
                page: prevState.page - 1
            }
        });
    }

//--------------------------------------------------------------------------

    renderList(){
        console.log("Props : " + JSON.stringify(this.props.blogs))
        return this.props.blogs.map((blog) => {
            return <Blog title={ blog.blogTitle } key={blog.blogId} blogId={blog.blogId} blogAuthor={blog.blogAuthor} likes={blog.blogLikes} views={blog.blogViews}>
            </Blog>
        }) 
    }

//--------------------------------------------------------------------------

    componentWillMount(){
        
        const { search } = this.props.history.location
        const searchString = search.split("=")[1]
        console.log("PROPS " + searchString);
        if (searchString){
            this.props.searchBlogsByKey(searchString)
        }
        else {
        	const currentpage = this.state.page;
            this.props.fetchBlogsFromServerForPage(currentpage);
        }
        console.log("Blogs Received Data?" );
    }

//--------------------------------------------------------------------------

	componentWillReceiveProps(){
		alert("inside componentWillReceiveProps");
		this.forceUpdate();
   	}
	

//--------------------------------------------------------------------------




    render(){   
        
        if (!this.props.blogs){
            return (
                <div/>
            )
        }
                
        var blogTds = {
          color: 'white'
        };
        
        var buttonStyle = {
        	textAlign: 'center'
        };
        
       
        return(
        	<div>
             <Table bsClass="table" className='table-users'  >
                <thead>
                    <tr style={{font:'verdena', color:'white'}}>
                        <th>Blog Title</th>
                        <th>Author</th>
                        <th>Blog Likes</th>
                        <th>Blog Views</th>
                    </tr>
                 </thead>
                <tbody style={blogTds}>
                 {this.renderList()}
                </tbody>
            </Table>
	            <div style= {buttonStyle}>
		            <button disabled={this.state.page <= 1} onClick={this.handlePrev}>Previous</button>
		            &nbsp;
		            <button onClick={this.handleNext}>Next</button>
	            </div>
            </div>
        );
    }
    
};


//--------------------------------------------------------------------------

function mapStateToProps(state){
  //  console.log(JSON.stringify("State Details blogs.jsx : " + JSON.stringify(state)))
    return {
        blogs:state.blogs.blogs
    }
}

//--------------------------------------------------------------------------

export default connect(mapStateToProps,{fetchBlogsFromServer, fetchBlogsFromServerForPage, searchBlogsByKey})(Blogs);

