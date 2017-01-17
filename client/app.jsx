import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

import reducer from './reducers/index';

import MainContainer from './mainContainer';
import Home from './home';
import Draw from './draw';
import Message from './message';

const finalStore = applyMiddleware(thunk)(createStore);
const store = finalStore(reducer);

class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={hashHistory}>
            <Route path='/' component={ MainContainer }>
              <IndexRoute component={ Home } />
              <Route path='/draw' component={ Draw } />
              <Route path='/message' component={ Message} />
            </Route>
          </Router>
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
