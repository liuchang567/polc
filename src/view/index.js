import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill'
import { Provider } from 'react-redux';
import { Router } from './routes/router';
import store from './store';


const BasicRoute = () => (
    <Provider store={store}>
        <Router />
    </Provider>
);

ReactDOM.render(<BasicRoute />, document.getElementById('root'));
