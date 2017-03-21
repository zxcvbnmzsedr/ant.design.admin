import React from 'react';
import {Router, Route, hashHistory} from 'dva/router';
import 'antd/dist/antd.css';
import PCIndex from './components/pc_index';
import PCFooter from './components/pc_footer';
import PCDashboard from './components/pc_dashboard';
import PCLogin from './components/pc_login';

export default function () {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={PCIndex}/>
            <Route path="/dashboard" component={PCDashboard}>
                <Route path="/sub1/tom" component={PCFooter}/>
                <Route path="/sub1/bill" component={PCLogin}/>
            </Route>
        </Router>
    )
}

