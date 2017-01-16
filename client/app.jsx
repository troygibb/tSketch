import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers/index';
import EditPage from './editPage';

const finalStore = applyMiddleware(thunk)(createStore);
const store = finalStore(reducer);

class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <EditPage />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));

// Enables HMR.
if (module.hot) {
  module.hot.accept();
}
