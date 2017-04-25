import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

class PCStaffModel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
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
    render(){
        const { children } = this.props;
        const {getFieldDecorator} = this.props.form;
        const { username,password } = this.props.record;
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
                    </Form>
                    {/*<Form>
                        <FormItem hasFeedback>
                            {getFieldDecorator('teacherName', {
                                initialValue: teacherName,
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写姓名'
                                    }
                                ]
                            })(<Input size='large' placeholder='姓名' />)}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('jobNumber', {
                                initialValue: jobNumber,
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写工号'
                                    }
                                ]
                            })(<Input size='large' placeholder='工号' />)}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('department', {
                                initialValue: department,
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写部门'
                                    }
                                ]
                            })(<Input size='large' placeholder='部门' />)}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('contactInformation', {
                                initialValue: contactInformation,
                            })(<Input size='large' placeholder='联系方式' />)}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('nativePlace', {
                                initialValue: nativePlace,
                            })(<Input size='large' placeholder='籍贯' />)}
                        </FormItem>
                    </Form>*/}
                </Modal>
            </div>
        );
    }
}
export default Form.create({})(PCStaffModel);