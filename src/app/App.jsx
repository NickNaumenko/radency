import React from 'react';
import { Provider } from 'react-redux';
import Employees from '../features/Employees/Employees';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Employees />
  </Provider>
);

export default App;
