import React from "react";
import ReactDOM from 'react-dom';
import Blogger from "./heapunderflow/components/bloggerApp.jsx";
import store from "./heapunderflow/store/store.js";
import {Provider} from 'react-redux'

ReactDOM.render(
<Provider store={store}>    
<Blogger />
</Provider>, document.getElementById('blogger'));
