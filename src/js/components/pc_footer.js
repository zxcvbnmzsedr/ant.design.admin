/**
 * Created by tianzeng on 2017-03-21.
 */
import React from 'react';
import {Layout,Breadcrumb} from 'antd';
const {Content,Footer} = Layout;

export default class PCFooter extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
            </Footer>
        );
    }
}