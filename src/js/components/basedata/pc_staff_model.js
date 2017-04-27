import React, { Component } from 'react';
import {Menu, Modal, Form, Icon,Input,Select ,Dropdown,Button,message} from 'antd';
const FormItem = Form.Item;
import {update,query,remove,create,queryRoles,updateRoles} from '../../service/user';
class PCStaffModel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            roles:"",
            userName:"",
            rolesMenu:[]
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
        // 所有可供选择的角色
        const data = queryRoles("/api/roles");
        Promise.resolve(data).then((value)=> {
            this.setState({
                rolesMenu:value._embedded.roles
            })
        }).catch((value)=> {

        })

    };


    render(){
        const { children } = this.props;
        const {getFieldDecorator} = this.props.form;
        const { username,password,rolesDescribe } = this.props.record;
        const menu = (
            this.state.rolesMenu.map((result) => {
                return <Select.Option key={result.name} value={result.description}>{result.description}</Select.Option>
            })
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
                            {getFieldDecorator('rolesDescribe', {
                                initialValue:rolesDescribe,
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择角色'
                                    }
                                ]
                            })(<Select style={{ width: 120 }}>
                                {menu}
                            </Select>)}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create({})(PCStaffModel);