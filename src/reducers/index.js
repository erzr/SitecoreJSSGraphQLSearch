import { CHANGE_ENTERED_SEARCH_TEXT, PERFORM_SEARCH, 
    REQUEST_RESULTS, RECEIVE_RESULTS, ADD_FACET_SELECTION, 
    REMOVE_FACET_SELECTION, CHANGE_QUERY_TEXT,
    CHANGE_PAGE_OFFSET, SET_FACET_STATE,
    REGISTER_FACET
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
    pageOffset: 0,
    registeredFacets: []
};

const handleFacetRegistration = (state, action) => {
    let ids = state.registeredFacets || [];

    let idAlreadyExists = ids.indexOf(action.facetId) > -1;

    let chosenIds = ids.slice();

    if(!idAlreadyExists) {
        chosenIds.push(action.facetId);            
    }      

    let response = {
        ...state
    };

    response.registeredFacets = chosenIds;

    return response;
};

const handleRemoveFacetSelection = (state, action) => {
    let ids = state[action.facetId] || [];

    let idAlreadyExists = ids.indexOf(action.facetValueId) > -1;

    let chosenIds = ids.slice();

    if(idAlreadyExists) {
        chosenIds = chosenIds.filter(id => id != action.facetValueId);        
    }      

    let response = {
        ...state
    };

    if (!chosenIds.length) {
        delete response[action.facetId];
    } else {
        response[action.facetId] = chosenIds;
    }

    return response;
};

const handleAddFacetSelection = (state, action) => {
    let ids = state[action.facetId] || [];

    let idAlreadyExists = ids.indexOf(action.facetValueId) > -1;

    let chosenIds = ids.slice();

    if(!idAlreadyExists) {
        chosenIds.push(action.facetValueId);            
    }      

    let response = {
        ...state
    };

    response[action.facetId] = chosenIds;

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
        case SET_FACET_STATE:
            var response = {
                ...state
            };

            response[action.facetId] = action.payload;

            return response;
        case REGISTER_FACET: 
            return handleFacetRegistration(state, action);
        default:
            return state;
    }
};

export default searchReducer;