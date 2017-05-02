/**
 * Created by tianzeng on 17-5-2.
 */
import React, { Component } from 'react';
import {TreeSelect, Modal, Form,Input,message} from 'antd';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const FormItem = Form.Item;
import {findAll,remove} from '../../service/source'
class PCStaffModel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],
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

    onChange(value){
        // console.log('onChange ', value, arguments);
        this.setState({ value });
    }
    componentWillMount() {
        this.loadFromServer();
    }
    loadFromServer() {
        const data = findAll();
        Promise.resolve(data).then((value)=> {
            const data= [];
            value.obj.map((c,index)=>{
                data.push({key:c.id+"",value:c.id+"",label:c.description,children:[]});
                const children = [];
                for (const i in c.permissions){
                    const permission = c.permissions[i];
                    children.push({
                        key:c.id+"-"+permission.id,// 资源ID-权限ID
                        label:permission.description,
                        value:c.id+"-"+permission.id
                    });
                }
                data[index].children = children;
            });
            this.setState({
                data:data
            })

            console.log("构造树",data)

        }).catch((value)=> {
            Promise.resolve(value).then((value)=>{
                message.error("请求失败:"+value.message)
            })
        })
    }
    render(){
        const { children } = this.props;
        const {getFieldDecorator} = this.props.form;
        const { name,description } = this.props.record;
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
                                        message: '请填写权限名称'
                                    }
                                ]
                            })(<Input size='large' placeholder='权限名称' />)}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('description', {
                                initialValue: description,
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写权限描述'
                                    }
                                ]
                            })(<Input size='large' placeholder='权限描述' />)}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('permission', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择可以操作的资源'
                                    }
                                ]
                            })(<TreeSelect
                                treeData={this.state.data}
                                onChange={this.onChange.bind(this)}
                                multiple={true}
                                treeCheckable={true}
                                showCheckedStrategy={SHOW_PARENT}
                                searchPlaceholder='Please select'
                                style={{ width: 300 }}/>)}

                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create({})(PCStaffModel);