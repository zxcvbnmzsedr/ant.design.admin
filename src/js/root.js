import React from 'react';
import {Router, Route, hashHistory} from 'dva/router';
import 'antd/dist/antd.css';
import PCIndex from './components/pc_index';
export default function () {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={PCIndex}>
            </Route>
        </Router>
    )
}
