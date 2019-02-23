import gql from 'graphql-tag';
import GraphQLClientFactory from '../lib/GraphQLClientFactory';
import config from '../temp/config';
import {
    CHANGE_ENTERED_SEARCH_TEXT, PERFORM_SEARCH,
    REQUEST_RESULTS, RECEIVE_RESULTS,
    ADD_FACET_SELECTION, REMOVE_FACET_SELECTION,
    CHANGE_QUERY_TEXT, CHANGE_PAGE_OFFSET,
    SET_FACET_STATE, REGISTER_FACET
} from '../constants';

export const changeEnteredSearchText = text => ({
    type: CHANGE_ENTERED_SEARCH_TEXT,
    text: text
});

export const updatePageOffset = offset => ({
    type: CHANGE_PAGE_OFFSET,
    offset: offset
});

export const setFacetState = payload => ({
    type: SET_FACET_STATE,
    payload: payload
});

export const changeQueryText = text => ({
    type: CHANGE_QUERY_TEXT,
    text: text
});

export const addFacetSelection = (facetId, facetValueId) => ({
    type: ADD_FACET_SELECTION,
    facetId,
    facetValueId
});

export const registerFacet = (facetId) => ({
  type: REGISTER_FACET,
  facetId
});

export const removeFacetSelection = (facetId, facetValueId) => ({
    type: REMOVE_FACET_SELECTION,
    facetId,
    facetValueId
});

function receiveResults(json) {
    return {
        type: RECEIVE_RESULTS,
        results: json.data.search.results.items.map(child => child.item),
        facets: json.data.search.facets,
        pageInfo: json.data.search.results.pageInfo,
        receivedAt: Date.now()
    }
}

function requestResults(keyword) {
    return {
        type: REQUEST_RESULTS,
        keyword
    }
};

function fetchResults(state) {
    return dispatch => {
        const client = GraphQLClientFactory(config.graphQLEndpoint, false, state);

        var fieldsEqual = [
          { name:"_fullpath", value:"/sitecore/content/home*" }
        ];

        state.registeredFacets.forEach((value) => {
          const facetValues = state[value];

          if (facetValues) {
            facetValues.forEach(facetValue => {
              fieldsEqual.push({
                name: value,
                value: facetValue
              })
            });
          }
        });

        return client.query({
            variables: {
              ...state,
              fieldsEqual
            },
            query: gql`
            query Search($query: String, $registeredFacets: [String!], $fieldsEqual: [ItemSearchFieldQuery]) {
                search(
                      fieldsEqual: $fieldsEqual
                      facetOn: $registeredFacets
                        first: 5
                        after: "0"
                        keyword: $query) {
                  facets {
                    name
                    values {
                      value
                      count
                    }
                  }
                  results {
                    items {
                      item {
                        name
                        path
                        url
                      }
                    }
                  }
                  results {
                    totalCount
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                  }
                }
              }
            `
        }).then(json => dispatch(receiveResults(json)));
    }
};

export function performSearch() {
    return (dispatch, getState) => {
        return dispatch(fetchResults(getState()))
    }
};