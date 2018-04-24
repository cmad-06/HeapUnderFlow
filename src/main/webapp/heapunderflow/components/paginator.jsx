import React from 'react'
import {Pagination} from 'react-bootstrap'

class Paginate extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            activePage: 1
        };
        this.handleSelect = this.handleSelect.bind(this);

    }

    handleSelect(eventKey) {
        console.log('handle select', eventKey);
        this.setState({
          activePage: eventKey,
        });
    }

    

    

    render(){
        return (
            <Pagination onSelect={this.handleSelect}>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{this.props.maxCount}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        )
    }
}

export default Paginate