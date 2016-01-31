// Import Redux
// import { createStore } from 'redux';

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

// Create simple implementation of Redux store
const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };

    dispatch({});

    return { getState, dispatch, subscribe };
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

const Counter = ({ value, onIncrement, onDecrement }) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);

const render = () => {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={() => store.dispatch({
                type: 'INCREMENT'
            })}
            onDecrement={() => store.dispatch({
                type: 'DECREMENT'
            })}
        />,
        document.getElementById('root')
    );
};

// subscribe() lets you register a callback that the Redux tool will call anytime
// an action has been dispatched so you can update the UI of your app
// to reflect current app state.
store.subscribe(render);

render();
