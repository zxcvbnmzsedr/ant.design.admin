import React from 'react';
import {Menu, Breadcrumb, Icon,message} from 'antd';
const SubMenu = Menu.SubMenu;
import 'antd/dist/antd.less';
import {connect} from 'dva';
import LoginComponents from './pc_login';
import PCDashboard from './pc_dashboard'
class PCIndex extends React.Component{
    constructor(){
        super();
    }
    componentDidUpdate(){
        const {loginMessage,user,login} = this.props.users;
        console.log(user)
        if(!login&&loginMessage.length > 0){
            message.error(loginMessage);
        }
    }
    render(){
        const {login,user} = this.props.users;
        return(
            <div>
                {login?
                    <div>
                        <PCDashboard/>
                    </div> : <LoginComponents/>
                }
            </div>
        );
    }
}


export default connect(({users}) => ({users}))(PCIndex)
