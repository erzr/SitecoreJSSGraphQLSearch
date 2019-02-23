import React from 'react';
import { Placeholder, VisitorIdentification } from '@sitecore-jss/sitecore-jss-react';
import { NavLink } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import Helmet from 'react-helmet';

// Using bootstrap is completely optional. It's used here to provide a clean layout for samples,
// without needing extra CSS in the sample app. Remove it in package.json as well if it's removed here.
import 'bootstrap/dist/css/bootstrap.css';
import './assets/app.css';
import logo from './assets/sc_logo.png';

const Layout = ({ route }) => (
  <React.Fragment>
    <Placeholder name="jss-main" rendering={route} />
  </React.Fragment>
);

export default Layout;
