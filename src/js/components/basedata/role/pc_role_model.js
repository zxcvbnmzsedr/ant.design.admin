/**
 * Created by tianzeng on 17-5-2.
 */
import React, { Component } from 'react';
import {TreeSelect, Modal, Form,Input,message} from 'antd';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const FormItem = Form.Item;
import {findAll,remove} from '../../../service/source'
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
                const permissions = [];
                for(const des in values.permissions){
                    permissions.push({"description":values.permissions[des]});
                }
                console.log('onChange ', permissions);
                values.permissions = permissions;
                onOk(values,this.props.record);
                this.hideModelHandler();
            }
        });
    };

    onChange(value){

        this.setState({ value });
        const permissions = [];
        for(const des in value){
            permissions.push({"description":value[des]});
        }
        console.log('onChange ', permissions);
    }
    componentWillMount() {
        this.loadFromServer();
    }
    loadFromServer() {
        const data = findAll();
        Promise.resolve(data).then((value)=> {
            const data= [];
            console.log("资源列表",value)
            value._embedded.sources.map((c,index)=>{
                data.push({key:c.name+"",value:c.name+"",label:c.name,children:[
                    {   key:c.name+"创建",
                        value:c.name+"创建",
                        label:c.name+"创建"
                    },
                    {   key:c.name+"删除",
                        value:c.name+"删除",
                        label:c.name+"删除"
                    },
                    {   key:c.name+"修改",
                        value:c.name+"修改",
                        label:c.name+"修改"
                    },
                    {   key:c.name+"查询",
                        value:c.name+"查询",
                        label:c.name+"查询"
                    },
                ]});
            });
            this.setState({
                data:data
            });

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
        const { name,description,_embedded } = this.props.record;
        const defaultValue = [];
        if (typeof _embedded != 'undefined'){
            _embedded.permissions.forEach( function( ele , idx , array ){
                defaultValue.push(ele.description)
            })
        }
        console.log("初始化权限",_embedded,defaultValue)
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
                                        message: '请填写角色名称'
                                    }
                                ]
                            })(<Input size='large' placeholder='角色名称' />)}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('description', {
                                initialValue: description,
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写角色描述'
                                    }
                                ]
                            })(<Input size='large' placeholder='角色描述' />)}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('permissions', {
                                initialValue:defaultValue,
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
                                searchPlaceholder='操作资源'
                                style={{ width: 300 }}/>)}

                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create({})(PCStaffModel);