import { FETCH_WEATHER } from '../actions/index';

export default function(state = [], action) {
    // Don't manipulate the state in reducer, just create new array and return that instead
    switch(action.type) {
    case FETCH_WEATHER:
        // return state.concat([action.payload.data]); // similar to line below
        return [ action.payload.data, ...state ]; // [city, city, city] NOT [city, [city, city]]
    }
    return state;
}
