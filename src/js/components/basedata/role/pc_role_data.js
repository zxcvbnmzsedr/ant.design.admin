/**
 * Created by tianzeng on 17-4-26.
 */
/**
 * Created by tianzeng on 2017-03-26.
 */
import {Table, Popconfirm, Button,message ,Row,Col,Tree} from 'antd';
import React from 'react';
import {connect} from 'dva';
import {findAll,updateRoles,createRoles,deleteRoles} from '../../../service/roles';
import PCRoleModel from './pc_role_model'

const TreeNode = Tree.TreeNode;

class PCRoleData extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            defaultValue:[]
        }
    }
    componentWillMount() {
        this.loadFromServer();
    }
    loadFromServer() {
        const data = findAll();

        Promise.resolve(data).then((value)=> {
            this.setState({
                data:value._embedded.roles
            })
        }).catch((value)=> {
            Promise.resolve(value).then((value)=>{
                message.error("请求失败:"+value.message)
            })
        })
    }

    /**
     * 创建角色
     * @param values
     * @param record
     */
    createHandler(values,record) {
        console.log("用户创建",values,record);
        const data = createRoles(values);
        Promise.resolve(data).then((value)=> {
            message.success("创建成功");
            this.loadFromServer();
        }).catch(function (value) {
            Promise.resolve(value).then((value)=>{
                message.error("请求失败:"+value.message)
            })
        })
    }

    /**
     * 更新角色
     * @param values
     * @param record
     */
    updateHandler(values,record) {
        console.log("更新角色",values,record);
        const data = updateRoles(record,values);
        Promise.resolve(data).then((value)=> {
            message.success("更新成功");
            this.loadFromServer();
        }).catch((value)=> {
            Promise.resolve(value).then((value)=>{
                message.error("请求失败:"+value.message)
            })
        })
    }
    handleDeleteAction(record){
        const data = deleteRoles(record);
        Promise.resolve(data).then((value)=> {
            message.success("删除成功")
            this.loadFromServer();
        }).catch((value)=> {
            Promise.resolve(value).then((value)=>{
                message.error("请求失败:"+value.message)
            })
        })
    }
    render(){
        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
        }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            width: '30%',
        },{
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Row>
                    <Col span="6">
                        <Col span="6">
                            <PCRoleModel record={record} onOk={this.updateHandler.bind(this,record)}>
                                <Button type="primary">编辑</Button>
                            </PCRoleModel>
                        </Col>
                    </Col>
                    <Col span="6"><Popconfirm title="确定删除资源?" onConfirm={this.handleDeleteAction.bind(this,record)} okText="是" cancelText="否">
                        <Button href="#">删除</Button>
                    </Popconfirm></Col>
                </Row>
            ),
        }];
        return (
            <div>
                <PCRoleModel record={{}} onOk={this.createHandler.bind(this)}>
                    <Button type="primary">创建角色</Button>
                </PCRoleModel>
                <Table columns={columns} dataSource={this.state.data} />
            </div>
        );
    }

}
export default connect(({users}) => ({users}))(PCRoleData)