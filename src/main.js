/**
 * Created by intelligrape on 3/5/17.
 */

import React from 'react';
import {render} from 'react-dom';
import App from './component/App.js'
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/store'


render(<Provider store={store}>
        <Router>
            <App/>
        </Router>
        </Provider>
    ,
    document.getElementById('app'));

