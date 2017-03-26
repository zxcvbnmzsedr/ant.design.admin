/**
 * Created by tianzeng on 2017-03-21.
 */
/**
 * Created by tianzeng on 2017-03-21.
 */
import React from 'react';
import {Menu, Icon} from 'antd';
import { Link } from 'dva/router'
const SubMenu = Menu.SubMenu;
import '../../css/dashboard.css';
export default class PCSider extends React.Component {
    componentDidUpdate(){

    }
    render() {
        return (
            <div>
                <div className="logo" />
                <Menu theme="dark" mode={this.props.mode}
                      defaultOpenKeys={[(this.props.location.pathname.split("/")[window.location.hash.split('/').length - 2])]}
                      defaultSelectedKeys={[(this.props.location.pathname.split("/")[window.location.hash.split('/').length - 1]) || 'dashboard']}>
                    <Menu.Item key="dashboard">
                        <Link to={`/dashboard`}>
                            <span>
                                <Icon type="file"/>
                                <span className="nav-text">
                                控制台
                                </span>
                            </span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="BaseData"
                        title={<span><Icon type="user"/><span className="nav-text">基础数据</span></span>}>
                        <Menu.Item key="StaffData"><Link to={`/BaseData/StaffData`}>教工数据</Link></Menu.Item>
                        <Menu.Item key="bill"><Link to={`/sub1/bill`}>Bill</Link></Menu.Item>
                        <Menu.Item key="3">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2"
                        title={<span><Icon type="team"/><span className="nav-text">Team</span></span>}>
                        <Menu.Item key="4">Team 1</Menu.Item>
                        <Menu.Item key="5">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="6"><span><Icon type="file"/><span className="nav-text">File</span></span>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}