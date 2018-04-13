import React from "react";
import store from "../store/store.js";
import { Link } from "react-router-dom"
import { Panel } from 'react-bootstrap'

class Comment extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        console.log("Comment Rendering" );
       
    }

    render(){
        var panelText = {
            font: 'verdena',
            color: 'grey'
          };

          
        return(
            
            <Panel bsStyle="success" className="custom" style={panelText}>
               <Panel.Body >{ this.props.commentText }</Panel.Body>
               <Panel.Footer>{ this.props.commentText }</Panel.Footer>
            </Panel>
            
            
        );
    }
};

export default Comment;

/*

<tr className='table-row'>      
                <td>{ this.props.commentText }</td>
                <td>{ this.props.user }</td>
            </tr>*/