import React from 'react';
import ReactDOM from 'react-dom/client';
import {AdminPanel, LoginPage} from './components'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/Admin' element={<AdminPanel/>} />
      </Routes>
    </Router>
  </Provider>
);