import React, { Component } from 'react';
import {Menu, Modal, Form, Icon,Input,Select ,Dropdown,Button,message} from 'antd';
const FormItem = Form.Item;
import {findAll} from '../../../service/roles';
class PCSourceModel extends React.Component{
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


    render(){
        const { children } = this.props;
        const {getFieldDecorator} = this.props.form;
        const { name,httpUrl} = this.props.record;

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
                            {getFieldDecorator('name', {
                                initialValue: name,
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写资源名称'
                                    }
                                ]
                            })(<Input size='large' placeholder='资源名称' />)}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('httpUrl', {
                                initialValue: httpUrl,
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写资源路径'
                                    }
                                ]
                            })(<Input size='large' placeholder='密码' />)}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create({})(PCSourceModel);