/**
 * Created by tianzeng on 2017-03-26.
 */
import {Table, Popconfirm, Button,message ,Row,Col} from 'antd';
import React from 'react';
import {connect} from 'dva';
import PCStaffModel from './pc_user_model';
import {listAll,createUser,updateUser,deleteUser} from '../../../service/user';
class PCStaffData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }

    }
    handleDeleteAction(record){
        const data = deleteUser(record);
        Promise.resolve(data).then((value)=> {
            message.success("删除成功")
            this.loadFromServer();
        }).catch((value)=> {
            Promise.resolve(value).then((value)=>{
                message.error("请求失败:"+value.message)
            })
        })
    }
    componentDidMount() {
        this.loadFromServer();
    }
    loadFromServer() {
        const data = listAll();
        Promise.resolve(data).then((value)=> {
            console.log(value);
            this.setState({
                    data:value._embedded.users
                }
            );
        }).catch((value)=> {
            Promise.resolve(value).then((value)=>{
                message.error("请求失败:"+value.message)
            })
        })
    }

    /**
     * 创建用户
     * @param values
     * @param action
     */
    createHandler(values) {
        console.log("创建用户",values);
        const data = createUser(values);
        Promise.resolve(data).then((value)=> {
            console.log("创建用户返回的结果",value);
            this.loadFromServer();
        }).catch((value)=> {
            Promise.resolve(value).then((value)=>{
                message.error("请求失败:"+value.message)
            })
        })
    }

    /**
     * 更新用户
     * @param values
     */
    updateHandler(values,record){
        console.log("更新用户",values);
        const data = updateUser(values,record);
        Promise.resolve(data).then((value)=> {
            console.log("更新用户返回的结果",value);
            this.loadFromServer();
        }).catch((value)=> {
            Promise.resolve(value).then((value)=>{
                message.error("请求失败:"+value.message)
            })
        })
    }


    render() {
        const columns = [
            {title: '姓名', dataIndex: 'username', key: 'username'},
            {title: '角色', dataIndex: '_embedded.roles[0].name', key: 'roles'},
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                        <Row>
                            <Col span="6"> <PCStaffModel record={record} roles={record._embedded.roles[0].name} onOk={this.updateHandler.bind(this)}>
                                <Button type="primary">编辑</Button>
                                    </PCStaffModel>
                            </Col>
                            <Col span="6"><Popconfirm title="确定删除用户?" onConfirm={this.handleDeleteAction.bind(this,record)} okText="是" cancelText="否">
                                <Button href="#">删除</Button>
                            </Popconfirm></Col>
                        </Row>
                ),
            }
        ];

        return (
            <div>
                <div>
                    <PCStaffModel record={{}} onOk={this.createHandler.bind(this)}>
                        <Button type="primary">创建用户</Button>
                    </PCStaffModel>
                </div>
                <Table rowKey="id" columns={columns} dataSource={this.state.data} />
            </div>
        );
    }
}
export default connect(({users}) => ({users}))(PCStaffData)