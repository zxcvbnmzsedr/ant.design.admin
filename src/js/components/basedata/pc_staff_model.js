import React, { Component } from 'react';
import {Menu, Modal, Form, Icon,Input ,Dropdown,Button,message} from 'antd';
const FormItem = Form.Item;
import {update,query,remove,create,queryRoles} from '../../service/user';
class PCStaffModel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            roles:""
        };
    }
    showModelHandler(e){
        if (e) e.stopPropagation();
        this.setState({
            visible: true,
        });
    };

    hideModelHandler(){
        this.setState({
            visible: false,
        });
    };
    okHandler(){
        const { onOk } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                onOk(values,this.props.record);
                this.hideModelHandler();
            }
        });
    };
    componentDidMount() {
        this.loadFromServer();
    }
    loadFromServer() {
        for(var key in this.props.record._links){
            if(key == 'roles'){
                console.log(this.props.record._links.roles.href)
                const data = queryRoles(this.props.record._links.roles.href);
                Promise.resolve(data).then((value)=> {
                   console.log(value._embedded);
                   console.log(value._embedded.roles[0].description);
                   this.setState({
                       roles:value._embedded.roles[0].description
                   })
                }).catch((value)=> {

                })

            }

        }
    };

    render(){
        const { children } = this.props;
        const {getFieldDecorator} = this.props.form;
        const { username,password } = this.props.record;
        const menu = (
            <Menu>
                <Menu.Item key="1">1st menu b item</Menu.Item>
                <Menu.Item key="2">2nd menu item</Menu.Item>
                <Menu.Item key="3">3d menu item</Menu.Item>
            </Menu>
        );
        return(
            <div>
                <span onClick={this.showModelHandler.bind(this)}>
                    { children }
                </span>
                <Modal
                    onOk={this.okHandler.bind(this)}
                    onCancel={this.hideModelHandler.bind(this)}
                    title="创建用户"
                    visible={this.state.visible}>
                    <Form>
                        <FormItem hasFeedback>
                            {getFieldDecorator('username', {
                                initialValue: username,
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写用户名'
                                    }
                                ]
                            })(<Input size='large' placeholder='姓名' />)}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('password', {
                                initialValue: password,
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写密码'
                                    }
                                ]
                            })(<Input size='large' placeholder='密码' />)}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('password', {
                                initialValue: password,
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写密码'
                                    }
                                ]
                            })(<Dropdown overlay={menu}>
                                <Button style={{ marginLeft: 8 }}>
                                    {this.state.roles} <Icon type="down" />
                                </Button>
                            </Dropdown>)}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create({})(PCStaffModel);