import React from 'react';
import {Router, Route, hashHistory} from 'dva/router';
import 'antd/dist/antd.css';
import PCIndex from './components/pc_index';
import PCFooter from './components/pc_footer';
import PCLayout from './components/pc_layout';
import PCLogin from './components/pc_login';
import PCStaffData from './components/basedata/pc_staff_data'
export default function () {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={PCIndex}/>
            <Route path="/dashboard" component={PCLayout}>
                <Route path="/BaseData/StaffData" component={PCStaffData}/>
                <Route path="/sub1/bill" component={PCLogin}/>
            </Route>
        </Router>
    )
}

