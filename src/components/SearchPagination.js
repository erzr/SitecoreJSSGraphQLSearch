import React from 'react';
import PropTypes from 'prop-types'
import {Pager} from 'react-bootstrap';
import { connect } from "react-redux";
import {updatePageOffset, performSearch} from '../actions';

class SearchPagination extends React.Component {

    constructor(props) {
        super(props);

        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
    }

    handlePreviousClick() {
        var newOffset = this.props.pageOffset - this.props.pageSize;
        this.props.updatePageOffset(newOffset);
        this.props.performSearch();
    }

    handleNextClick() {
        var newOffset = this.props.pageOffset + this.props.pageSize;
        this.props.updatePageOffset(newOffset);
        this.props.performSearch();
    }
    
    render() {
        return (
            <Pager>
                {this.props.pageInfo.hasPreviousPage && 
                    <Pager.Item previous href="#" onClick={this.handlePreviousClick}>
                        &larr; Previous Page
                    </Pager.Item>
                }
                {this.props.pageInfo.hasNextPage && 
                    <Pager.Item next href="#" onClick={this.handleNextClick}>
                        Next Page &rarr;
                    </Pager.Item>
                }
            </Pager>
        );
    }
}

SearchPagination.propTypes = {
    pageInfo: PropTypes.object.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageOffset: PropTypes.number.isRequired,
    performSearch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    pageInfo: state.pageInfo,
    pageSize: state.pageSize,
    pageOffset: state.pageOffset
});

const mapDispatchToProps = (dispatch) => ({
    performSearch: () => dispatch(performSearch()),
    updatePageOffset: offset => dispatch(updatePageOffset(offset)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPagination);