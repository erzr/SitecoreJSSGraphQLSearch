import React from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import {Card} from 'react-bootstrap';

const SearchResultItem = (props) => (
  <Card>
    <Card.Body>
      <h4>
        <a href={props.item.url}>{props.item.name}</a>
      </h4>
      <p>{props.item.selftext}</p>
    </Card.Body>
  </Card>
);

const SearchResults = (props) => (
  <div>
    {props.results.map((item, i) => <SearchResultItem item={item} key={i} />)}
  </div>
);

SearchResults.propTypes = {
  results: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  results: state.results
});

export default connect(
  mapStateToProps
)(SearchResults);
