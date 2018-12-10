import {createApolloFetch} from 'apollo-fetch';

import { CHANGE_ENTERED_SEARCH_TEXT, PERFORM_SEARCH, 
    REQUEST_RESULTS, RECEIVE_RESULTS,
    ADD_FACET_SELECTION, REMOVE_FACET_SELECTION,
    CHANGE_QUERY_TEXT, CHANGE_PAGE_OFFSET,
    SET_FACET_STATE } from '../constants';

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

        const endpointUrl = `${window.SearchConfig.Endpoint.Url}?sc_apikey=${window.SearchConfig.Endpoint.ApiKey}`;

        const fetch = createApolloFetch({
            uri: endpointUrl,
        });

        const fieldsEqual = [
            { name:"_fullpath", value:"/sitecore/content/home*" }
        ];

        for (var facet of window.SearchConfig.Facets) {
            if (state[facet.Id]) {
                for (var facetValue of state[facet.Id]) {
                    fieldsEqual.push({
                        name: facet.Id,
                        value: facetValue
                    });
                }
            }
        }

        // hack, refactor this.
        let fieldsEqualString = JSON.stringify(fieldsEqual);

        var name = new RegExp('"name"', 'g');
        fieldsEqualString = fieldsEqualString.replace(name, "name");

        var value = new RegExp('"value"', 'g');
        fieldsEqualString = fieldsEqualString.replace(value, "value");

        var facetFields = JSON.stringify(window.SearchConfig.Facets.map(x => x.Id));

        var query = `{
            search(
                fieldsEqual:${fieldsEqualString}
                  facetOn:${facetFields}
                  keyword:"${state.query}"
                  first: ${state.pageSize}
  		          after: "${state.pageOffset}") {
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
                totalCount
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
              }
            }
          }`;

        return fetch({
                query: query
            })
            .then(json => dispatch(receiveResults(json)))
    }
};

export function performSearch() {
    return (dispatch, getState) => {
        return dispatch(fetchResults(getState()))
    }
};