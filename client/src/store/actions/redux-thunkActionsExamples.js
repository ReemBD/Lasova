/*
redux-thunk middleware: 
when we need async actions before dispatching new info to reducer 
or perform complex actions- calculate new state based on current state..

redux-thunk Action Examples:
*/

export function exampleAction1(exampleParams) {
  // dispatch comes from "redux-thunk"...
  return async (dispatch) => {   // async if await needed..
    const newItems = await someAxiosOrFetch(exampleParams);
    // dispatch action to reducer:
    dispatch({ type: 'SET_ITEMS', newItems });
  }
}

export function exampleAction2(withSomeParams) {
  // dispatch, getState - "redux-thunk magic"...
  // here we need access to the current state in order to do action2... 
  return (dispatch, getState) => {   // (async if await needed..)
    const { reducerItem } = getState().exampleReducer;
    // getState().reducerName= the reducerName in store.js rootReducer
    // reducerItem deconstructed from reducer state object, alternatively:
    const prevItem = getState().exampleReducer.reducerItem;
    // (both variables contain the same object)

    const newItem = doSomeActionOn(prevItem, withSomeParams);
    dispatch({ type: 'SET_ITEM', newItem });
  }
}

// if action is simple, just return the action object,
// it will be magically dispatched by redux-thunk
export function simpleAction(newData) {
  return { type: 'SET_DATA', newData };
}