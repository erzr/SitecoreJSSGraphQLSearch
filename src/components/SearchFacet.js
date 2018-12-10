import React from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import {Panel, Checkbox} from 'react-bootstrap';
import SearchFacetCheckbox from './SearchFacetCheckbox';

class SearchFacet extends React.Component {
    render() {

        const facetConfig = window.SearchConfig.Facets.find(facet => facet.Id == this.props.facet.name),
              title = facetConfig && facetConfig.Title ? facetConfig.Title : this.props.facet.name;

        const checkboxes = this.props.facet.values.map(
            (value, i) => <SearchFacetCheckbox key={i} value={value} facetId={this.props.facet.name} />);

        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title componentClass="h3">{title}</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <ul className="list-unstyled">
                        {checkboxes}
                    </ul>
                </Panel.Body>
            </Panel>
        );
    }
}

SearchFacet.propTypes = {
    facet: PropTypes.object.isRequired
};

export default SearchFacet;