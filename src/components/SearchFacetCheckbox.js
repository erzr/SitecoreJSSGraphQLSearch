import React from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import {Checkbox} from 'react-bootstrap';
import {addFacetSelection, removeFacetSelection, performSearch, updatePageOffset} from '../actions'

class SearchFacetCheckbox extends React.Component {

    constructor(props) {
        super(props);

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(e) {
        if (e.target.checked) {
            this.props.addFacetSelection(this.props.facetId, this.props.value.value);
        } else {
            this.props.removeFacetSelection(this.props.facetId, this.props.value.value);
        }

        this.forceUpdate();

        this.props.updatePageOffset(0);
        this.props.performSearch();
    }

    render() {
        const facet = this.props.facetValues[this.props.facetId],
            isChecked = facet == null ? false : facet.indexOf(this.props.value.value) > -1;

        return <Checkbox onChange={this.handleCheckboxChange} checked={isChecked}>{this.props.value.value} ({this.props.value.count})</Checkbox>;
    }
}

SearchFacetCheckbox.propTypes = {
    value: PropTypes.object.isRequired,
    facetId: PropTypes.string.isRequired,
    facetValues: PropTypes.object.isRequired,
    addFacetSelection: PropTypes.func.isRequired,
    removeFacetSelection: PropTypes.func.isRequired,
    performSearch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    facetValues: state.facetValues
});

const mapDispatchToProps = (dispatch) => ({
    addFacetSelection: (facetId, facetValueId) => dispatch(addFacetSelection(facetId, facetValueId)),
    removeFacetSelection: (facetId, facetValueId) => dispatch(removeFacetSelection(facetId, facetValueId)),
    performSearch: () => dispatch(performSearch()),
    updatePageOffset: offset => dispatch(updatePageOffset(offset))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchFacetCheckbox);