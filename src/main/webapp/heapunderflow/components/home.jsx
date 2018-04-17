
import React from "react";
import Blogs from "./blogs.jsx";

import Blogger from "./bloggerApp.jsx";
import ErrorBoundary from "./catcherror.jsx";


class Home extends React.Component{
    constructor(props){
        super(props);
        
        
        
    }
    render(){
        return(
            
               // <ErrorBoundary>
                <Blogs history={this.props.history}></Blogs>
                //</ErrorBoundary>  
             
        );
    }
};

export default Home;