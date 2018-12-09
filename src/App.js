import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import logo from './logo.svg';
import './App.css';
import { Grid, Row, Col } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults'
import SearchFacets from './components/SearchFacets'
import SearchPagination from './components/SearchPagination'
import {performSearch} from './actions'

class App extends Component {

  componentDidMount() {
    this.props.performSearch();
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <h1>Search</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <SearchBar />
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <SearchFacets />
          </Col>
          <Col md={9}>
            <SearchResults />
          </Col>
        </Row>
        <Row>
          <Col md={9} mdOffset={3}>
            <SearchPagination />
          </Col>
        </Row>
      </Grid>
    );
  }
}

SearchBar.propTypes = {
  performSearch: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  performSearch: () => dispatch(performSearch())
});

export default connect(
  null,
  mapDispatchToProps
)(App);