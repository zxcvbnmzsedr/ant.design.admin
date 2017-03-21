/**
 * Created by tianzeng on 2017-03-15.
 */
import React from 'react'
import { Button, Row, Form, Input,message } from 'antd';
import styles from '../../css/login.css';
import { connect } from 'dva';
import { config } from '../utils';
const FormItem = Form.Item;
class LoginComponents extends React.Component{
    constructor(){
        super();
    }
    componentWillMount(){

    }
   handleOk(){
        this.props.form.validateFields((err,values)=>{
                if(!err){
                    console.log('接收到登录表单的参数: ', values);
                    this.props.dispatch({type: 'users/login',payload: values});
                }
            }
        );
    }

    render(){
        const { getFieldDecorator,loginButtonLoading } = this.props.form;

        return(
            <div className={styles.form}>
                <div className={styles.logo}>
                    <img src={config.logoSrc} />
                    <span>Ant Design</span>
                </div>
                <Form>
                    {/*hasFeedback 配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用*/}
                    <FormItem hasFeedback>
                        {getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    message: '请填写用户名'
                                }
                            ]
                        })(<Input size='large' placeholder='用户名' />)}
                    </FormItem>
                    <FormItem hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请填写密码'
                                }
                            ]
                        })(<Input size='large' type='password' placeholder='密码' />)}
                    </FormItem>
                    <Row>
                        <Button type='primary' size='large' onClick={this.handleOk.bind(this)} loading={loginButtonLoading}>
                            登录
                        </Button>
                    </Row>
                </Form>
            </div>
        );
    }

}


export default connect()(Form.create({})(LoginComponents));