import React from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import SearchResultItem from './SearchResultItem';

class SearchResults extends React.Component {

    render() {
        const resultItems = this.props.results.map((item, i) => <SearchResultItem item={item} key={i} />);

        return (
            <div>
                {resultItems}
            </div>
        );
    }

}

SearchResults.propTypes = {
    results: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    results: state.results
});

export default connect(
    mapStateToProps
)(SearchResults);