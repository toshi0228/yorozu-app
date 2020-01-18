import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import store from './store'
import App from './components/App';
import SiginInPage from './containers/SignInPage'

import './styles/index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path = "/signin" component={SiginInPage} />
                <Route exact path = "/" component={App} />>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
