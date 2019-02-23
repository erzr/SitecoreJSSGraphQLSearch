import React from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { Card, ListGroup, Form } from 'react-bootstrap';
import SearchFacetCheckbox from '../SearchFacetCheckbox'
import {registerFacet} from '../../actions';

class SearchFacet extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const facetId = this.getFacetFieldId();
    this.props.registerFacet(facetId);
  }

  getFacetFieldId() {
    return this.props.fields.fieldId.value;
  }

  render() {
    const facetId = this.getFacetFieldId();
    const facet = this.props.facets.find(x => x.name == facetId);

    return (
      <Card>
        <Card.Header>
          <Text field={this.props.fields.title} />
        </Card.Header>
        <ListGroup variant="flush">
          {
            facet && facet.values.map(
              (value, i) => <ListGroup.Item key={i}><SearchFacetCheckbox value={value} facetId={facetId} /></ListGroup.Item>)
          }
        </ListGroup>
      </Card>
    )
  }

}

SearchFacet.propTypes = {
  facets: PropTypes.array.isRequired,
  registerFacet: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  facets: state.facets
});

const mapDispatchToProps = (dispatch) => ({
  registerFacet: facetId => dispatch(registerFacet(facetId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFacet);
