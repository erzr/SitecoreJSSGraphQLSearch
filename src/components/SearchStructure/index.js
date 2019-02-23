import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Container } from 'react-bootstrap';

const SearchStructure = ({rendering}) => (
  <Container>
    <Placeholder name="jss-search-main" rendering={rendering} />
  </Container>
);

export default SearchStructure;
