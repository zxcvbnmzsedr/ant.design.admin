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
    render() {
        console.log(window.location.hash)
        console.log((window.location.hash.split("/")[window.location.hash.split('/').length - 2]).split("?")[0])
        return (
            <div>
                <div className="logo" />
                <Menu theme="dark" mode={this.props.mode}
                      defaultOpenKeys={[(window.location.hash.split("/")[window.location.hash.split('/').length - 2]).split("?")[0]]}
                      defaultSelectedKeys={[(window.location.hash.split("/")[window.location.hash.split('/').length - 1]).split("?")[0]]}>
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="user"/><span className="nav-text">User</span></span>}>
                        <Menu.Item key="tom"><Link to={`/sub1/tom`}>Tom</Link></Menu.Item>
                        <Menu.Item key="bill"><Link to={`/sub1/bill`}>Bill</Link></Menu.Item>
                        <Menu.Item key="3">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2"
                        title={<span><Icon type="team"/><span className="nav-text">Team</span></span>}>
                        <Menu.Item key="4">Team 1</Menu.Item>
                        <Menu.Item key="5">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="6">
                              <span>
                                <Icon type="file"/>
                                <span className="nav-text">File</span>
                              </span>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}