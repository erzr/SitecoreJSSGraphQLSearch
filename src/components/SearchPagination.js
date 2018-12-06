import React from 'react';
import {Pager} from 'react-bootstrap';

class SearchPagination extends React.Component {

    render() {
        return (
            <Pager>
                <Pager.Item previous href="#">
                    &larr; Previous Page
                </Pager.Item>
                <Pager.Item next href="#">
                    Next Page &rarr;
                </Pager.Item>
            </Pager>
        );
    }
}

export default SearchPagination;