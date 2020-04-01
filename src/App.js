import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Home from './Home';

function reducer(state = [], action) {

  switch (action.type) {
    case 'ADD_DATA':
      return state.concat([action.data]);
    case 'DELETE_DATA':
      return state.filter((post) => post.id !== action.id);
    default:
      return state
  }
}

export const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
