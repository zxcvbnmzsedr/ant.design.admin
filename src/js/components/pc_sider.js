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
                        <Menu.Item key="StaffData"><Link to={`/BaseData/StaffData`}>用户数据</Link></Menu.Item>
                        <Menu.Item key="SourceData"><Link to={`/BaseData/SourceData`}>资源管理</Link></Menu.Item>
                        <Menu.Item key="RolesData"><Link to={`/BaseData/RolesData`}>角色管理</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}