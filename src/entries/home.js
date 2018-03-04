import React from 'react';
import { render } from 'react-dom';
import Home from '../pages/containers/home';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from '../reducers/index';
import { Map as map } from "immutable";
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

/*
    se movio a cada reducer
    const initialState = {
        data: {
            entities:data.entities,
            categories:data.result.categories,
            search: []
        },
        modal:{
            visibility:false,
            mediaId:null
        }
    };
*/
/*
    Nota en inmutablejs, los objetos son map() y los arreglos son list()
*/

const store = createStore(
    reducer,
    map(),
    composeWithDevTools(applyMiddleware(logger, thunk))//,otrologger))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
const homeContainer = document.getElementById('home-container');

render(
    <Provider store={store}>
        <Home />
    </Provider>
    , homeContainer);