import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { Row, Col } from 'react-bootstrap';

const SearchHeader = ({fields}) => (
  <Row>
    <Col md={12}>
      <h1>
        <Text field={fields.title} />
      </h1>
      <hr />
    </Col>
  </Row>
);

export default SearchHeader;
