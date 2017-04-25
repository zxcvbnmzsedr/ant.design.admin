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

    }
    componentWillMount() {
        const { cookies } = this.props;
    }

    componentDidUpdate(){
        const {loginMessage,user,login} = this.props.users;
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
                        <PCDashboard location={this.props.location}/>
                    </div> : <LoginComponents/>
                }
            </div>
        );
    }
}


export default connect(({users}) => ({users}))(PCIndex)
