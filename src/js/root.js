import React from 'react';
import {Router, Route, hashHistory} from 'dva/router';
import 'antd/dist/antd.css';
import PCIndex from './components/pc_index';
import PCLayout from './components/pc_layout';
import PCSourceData from './components/basedata/pc_source_data';
import PCUserData from './components/basedata/pc_user_data'
import PCRoleData from './components/basedata/pc_role_data'
export default function () {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={PCIndex}/>
            <Route path="/dashboard" component={PCLayout}>
                <Route path="/BaseData/StaffData" component={PCUserData}/>
                <Route path="/BaseData/SourceData" component={PCSourceData}/>
                <Route path="/BaseData/RolesData" component={PCRoleData}/>
            </Route>
        </Router>
    )
}

