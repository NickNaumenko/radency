import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import GlobalStyles from '../styles/globalStyles';
import Home from '../components/Home/Home';

const App = () => (
  <Provider store={store}>
    <GlobalStyles />
    <Home />
  </Provider>
);

export default App;
