import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import ReduxQuerySync from 'redux-query-sync'

import './index.css';
import App from './App';
import searchReducer from './reducers'
import {CHANGE_PAGE_OFFSET, CHANGE_QUERY_TEXT, SET_FACET_STATE} from './constants';

window.SearchConfig = {
    Facets: ["contenttype"],
    EndpointUrl: "http://sc9102.sc/sitecore/api/graph/items/master/?sc_apikey=%7B97FE0B3D-E92A-4CDB-A653-77065FD3E321%7D"
};

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);
const store = createStore(searchReducer, enhancer);

var params = {
    offset: {
        selector: state => state.pageOffset,
        action: value => ({type: CHANGE_PAGE_OFFSET, offset: value}),
        stringToValue: string => Number.parseInt(string) || 0,
        valueToString: value => `${value}`,
        defaultValue: 0
    },
    q: {
        selector: state => state.query,
        action: value => ({type: CHANGE_QUERY_TEXT, text: value}),
        defaultValue: ""
    }
};

for (var facet of window.SearchConfig.Facets) {
    params[facet] = {
        selector: state => state[facet],
        action: value => ({type: SET_FACET_STATE, payload: value, facetId: facet}),
        stringToValue: string => string.split(','),
        valueToString: value => value.join(',')
    }
}

ReduxQuerySync({
    store,
    params: params,
    initialTruth: 'location',
    replaceState: true,
})

let app = <Provider store={store}><App/></Provider>

ReactDOM.render(app, document.getElementById('root'));