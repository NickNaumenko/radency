import React from 'react';
import { Provider } from 'react-redux';
import Header from '../components/Header/Header';
import Employees from '../features/Employees/Employees';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Header />
    <Employees />
  </Provider>
);

export default App;
