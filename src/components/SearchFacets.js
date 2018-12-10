import React from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux";

import SearchFacet from './SearchFacet';

class SearchFacets extends React.Component {
    render() {
        var facets = this.props.facets.filter(x => x.values.length)
            .map((facet, i) => <SearchFacet facet={facet} key={i} />);

        return (
            <div>
                {facets}
            </div>
        );
    }
}

SearchFacets.propTypes = {
    facets: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    facets: state.facets
});

export default connect(
    mapStateToProps
)(SearchFacets);