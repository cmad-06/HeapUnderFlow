
import React from "react";
import Blog from "./Blog.jsx";
import store from "../store/store.js";
import { connect } from 'react-redux';
import {fetchBlogsFromServer} from "../actions/blogactions.js";
import {Table} from 'react-bootstrap'


import BootstrapTable from 'react-bootstrap-table-next';

class Blogs extends React.Component{
    
    constructor(props){
        super(props);
        
        console.log("Blogs cons" + JSON.stringify(props));
       // this.onClickHandler = this.onClickHandler.bind(this);
    }

    renderList(){
        console.log("Props : " + JSON.stringify(this.props.blogs.blogs))
        return this.props.blogs.map((blog) => {
            return <Blog title={ blog.blogTitle } key={blog.blogId} blogId={blog.blogId} likes={blog.blogLikes} >
            </Blog>
        }) 
    }

    

    componentWillMount(){
        console.log("Blogs" );
        store.dispatch(fetchBlogsFromServer())
        console.log("Blogs Received Data?" );
    }

    render(){
        const rowEvents = {
            onClick: (e, row, rowIndex) => {
              console.log(row)
              console.log(rowIndex)
              console.log(this.props.history)
              this.props.history.push({
                pathname: '/blogpage',
                blogId:rwo.blogId,
            })
            }
          };
        const columns = [{
            dataField: 'blogId',
            text: 'Blog ID',
            href:'/blogpage'
          }, {
            dataField: 'blogTitle',
            text: 'Blog Title'
          }, {
            dataField: 'blogLikes',
            text: 'Blog Likes'
          }];
          
          return(
          <BootstrapTable keyField='blogId' data={ this.props.blogs } columns={ columns } rowEvents={ rowEvents }  hover />
          )
    }

    /*
    render() {
        const rowEvents = {
            onClick: (e, row, rowIndex) => {
              console.log("Hello, World!!")
            }
          };
        
        return (
          <BootstrapTable data={ this.props.blogs }   hover height='120' scrollTop={ 'Bottom'  } bordered={ false } rowEvents={ rowEvents }> 
              
              <TableHeaderColumn dataField='blogId'  isKey>Blog Id</TableHeaderColumn>
              <TableHeaderColumn dataField='blogTitle'>Blog Title </TableHeaderColumn>
              <TableHeaderColumn dataField='blogLikes'>Blog Likes</TableHeaderColumn>
          </BootstrapTable>
        );
      }*/
/*
    render(){   
        return(
             <Table className="table table-striped table-condensed" >
                <thead>
                    <tr>
                        <th>BlogTitle</th>
                        <th>BlogId</th>
                        <th>BlogLikes</th>
                    </tr>
                 </thead>
                <tbody>
                 {this.renderList()}
                </tbody>
            </Table>
        );
    }
    */
};

function mapStateToProps(state){
    console.log(JSON.stringify("State Details : " + JSON.stringify(state)))
    return {
        blogs:state.blogs.blogs
    }
}



export default connect(mapStateToProps)(Blogs);