import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

import reducer from './reducers/index';

import Navbar from './Navbar';
import Home from './Home';
import Draw from './Draw';
import Message from './Message';
import ConfirmPage from './ConfirmPage';
import Success from './Success';
import Footer from './Footer';


const finalStore = applyMiddleware(thunk)(createStore);
const store = finalStore(reducer);

class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="/" component={Navbar}>
              <IndexRoute component={Home} />
              <Route path="/draw" component={Draw} />
              <Route path="/message" component={Message} />
              <Route path="/confirm" component={ConfirmPage} />
              <Route path="/doodle-success" component={Success} />
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
