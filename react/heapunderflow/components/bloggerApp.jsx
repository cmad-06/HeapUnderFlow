import React from 'react'
import Home from "./home.jsx";
import LoginForm from "./login.jsx";
import SignupForm from "./signup.jsx";
import {BootstrapTable, 
    TableHeaderColumn} from 'react-bootstrap-table';
import {getTopBlogs} from "../actions/useractions.js";

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class Blogger extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : {}
        }
        

    }

    componentDidMount(){
        fetch('http://localhost:8080/heapunderflow/service/blog').then(response => response.json())
        .then(data =>{
            console.log(data);
            this.setState({
                
                data:data
            })
        })
    }

    render(){
        return (
            <Router>
                <div>
                    <h1>HeapUnderFlow</h1>
                    <Link to="/">Home</Link> | <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
                    <hr/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/signup" component={SignupForm}/>
                    <Route path="/login" component={LoginForm}/> 
                    <br/>
                    <div>
                    <BootstrapTable data={this.props.data}>
                        <TableHeaderColumn isKey dataField='id'>
                            User
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>
                            Blog Title
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='value'>
                            Likes
                        </TableHeaderColumn>
                    </BootstrapTable>
                </div>
                </div>
                
            </Router>
        )
    }
}

export default Blogger