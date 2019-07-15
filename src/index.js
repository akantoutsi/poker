import React                            from 'react';
import ReactDOM                         from 'react-dom';
import App                              from './App';
import * as serviceWorker               from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import tableReducer                     from './store/reducers/tableReducer';
import playersReducer                   from './store/reducers/playersReducer';
import boardReducer                     from './store/reducers/boardReducer';

import './index.css';

const rootReducer = combineReducers({
    table  : tableReducer,
    board  : boardReducer, 
    players: playersReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
