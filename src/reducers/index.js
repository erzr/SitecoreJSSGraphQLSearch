import { CHANGE_ENTERED_SEARCH_TEXT, PERFORM_SEARCH, 
    REQUEST_RESULTS, RECEIVE_RESULTS, ADD_FACET_SELECTION, 
    REMOVE_FACET_SELECTION, CHANGE_QUERY_TEXT,
    CHANGE_PAGE_OFFSET
 } from '../constants';

const initialState = {
    query: '',
    enteredSearchText: '',
    isFetching: false,
    results: [],
    facets: [],
    pageInfo: {},
    facetValues: {},
    pageSize: 5,
    pageOffset: 0
};

const handleRemoveFacetSelection = (state, action) => {
    let ids = state.facetValues[action.facetId] || [];

    let idAlreadyExists = ids.indexOf(action.facetValueId) > -1;

    let chosenIds = ids.slice();

    if(idAlreadyExists) {
        chosenIds = chosenIds.filter(id => id != action.facetValueId);        
    }      

    let response = {
        ...state
    };

    if (!chosenIds.length) {
        delete response.facetValues[action.facetId];
    } else {
        response.facetValues[action.facetId] = chosenIds;
    }

    return response;
};

const handleAddFacetSelection = (state, action) => {
    let ids = state.facetValues[action.facetId] || [];

    let idAlreadyExists = ids.indexOf(action.facetValueId) > -1;

    let chosenIds = ids.slice();

    if(!idAlreadyExists) {
        chosenIds.push(action.facetValueId);            
    }      

    let response = {
        ...state
    };

    response.facetValues[action.facetId] = chosenIds;

    return response;
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ENTERED_SEARCH_TEXT:
            return {
                ...state,
                enteredSearchText: action.text
            }
        case PERFORM_SEARCH:
            return {
                ...state
            }
        case REQUEST_RESULTS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_RESULTS:
            return {
                ...state,
                isFetching: false,
                results: action.results,
                facets: action.facets,
                pageInfo: action.pageInfo
            }
        case REMOVE_FACET_SELECTION:
            return handleRemoveFacetSelection(state, action);
        case ADD_FACET_SELECTION:
            return handleAddFacetSelection(state, action);
        case CHANGE_QUERY_TEXT:
            return {
                ...state,
                query: action.text
            }
        case CHANGE_PAGE_OFFSET:
            return {
                ...state,
                pageOffset: action.offset
            }
        default:
            return state;
    }
};

export default searchReducer;