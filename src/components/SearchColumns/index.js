import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';

const SearchColumns = ({ rendering }) => (
  <Row>
    <Col md={3}>
      <Placeholder name="jss-search-column-sidebar" rendering={rendering} />
    </Col>
    <Col md={9}>
      <Placeholder name="jss-search-column-main" rendering={rendering} />
    </Col>
  </Row>
);

export default SearchColumns;
