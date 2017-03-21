/**
 * Created by tianzeng on 2017-03-17.
 */
import React from 'react';
import 'antd/dist/antd.less';
import {Layout,Breadcrumb,Menu,Icon} from 'antd';
import PCSider from './pc_sider';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
import '../../css/dashboard.css'
export default class PCDashboard extends React.Component {
    constructor(){
        super();
        this.state = {
            collapsed: false,
            mode: 'inline',
        }
    }
    onCollapse(collapsed){
        console.log(collapsed);
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }
    render() {
        return (
            <Layout>
                <Sider collapsible
                       collapsed={this.state.collapsed}
                       onCollapse={this.onCollapse.bind(this)}>
                    <PCSider mode={this.state.mode}/>
                </Sider>
                <Layout>
                    <PCHeader>Header</PCHeader>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: '700px' }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <PCFooter>Footer</PCFooter>
                </Layout>
            </Layout>


        );
    }
}