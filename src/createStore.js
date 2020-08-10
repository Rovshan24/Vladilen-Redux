export function createStore(rootReducers, initialState) {
    let state = rootReducers(initialState);
    const subscribers = [];

    return {
        // action === {type: 'INCREMENT'}
        dispatch() {
            state = rootReducers(state, action);

            subscribers.forEach((sub) => sub());
        },
        subscriber(callback) {
            subscribers.push(callback);
        },
        getState() {
            return state;
        },
    };
}
