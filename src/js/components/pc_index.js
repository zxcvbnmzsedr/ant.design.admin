import React from 'react';
import {Menu, Breadcrumb, Icon,message} from 'antd';
import 'antd/dist/antd.less';
import {connect} from 'dva';
import LoginComponents from './pc_login';
import PCDashboard from './pc_layout';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
class PCIndex extends React.Component{
    constructor(){
        super();
        this.state = {
            login:false
        };
    }
    loginSuccess(){
        this.setState({
            login: true
        });
    }
    render(){
        return(
            <div>{
                    this.state.login?<PCDashboard location={this.props.location}/>:<LoginComponents loginSuccess={this.loginSuccess.bind(this)}/>
                }
                </div>
        );
    }
}


export default connect(({users}) => ({users}))(PCIndex)
