// Import Redux
import { createStore } from 'redux';

// Reducer: Tells how state is updated with actions.
const counter = (state = 0, action) => {
    switch (action.type) {
    case 'INCREMENT':
        return state + 1;
    case 'DECREMENT':
        return state - 1;
    default:
        return state;
    }
};

// Store: Binds together the 3 principles of Redux.
// Holds the current application state object.
// Lets you dispatch actions.

// Creates new store with "counter" as the reducer.
// counter will manage the state updates.
const store = createStore(counter);

// getState() retrieves the current state of the Redux store.
store.getState();

// dispatch() lets you dispatch actions that change the state of your app.
store.dispatch({ type: 'INCREMENT' });

const render = () => {
    document.body.innerText = store.getState();
};

// subscribe() lets you register a callback that the Redux tool will call anytime
// an action has been dispatched so you can update the UI of your app
// to reflect current app state.
store.subscribe(render);

render();

document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT'} );
});