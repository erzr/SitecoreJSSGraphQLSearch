import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Row, Col } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults'
import SearchFacet from './components/SearchFacet'
import SearchPagination from './components/SearchPagination'

class App extends Component {
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
            <SearchFacet />
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

export default App;
