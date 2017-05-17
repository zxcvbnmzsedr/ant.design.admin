/**
 * Created by tianzeng on 2017-03-26.
 */
import {Table, Popconfirm, Button,message ,Row,Col} from 'antd';
import React from 'react';
import {connect} from 'dva';
import PCStaffModel from './pc_user_model';
import {update,query,remove,create} from '../../service/user';
import { isEmptyObject} from '../../utils';
class PCStaffData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }

    }
    componentWillMount() {
        this.props.dispatch({type: 'users/query', payload: ""});
    }
    handleDeleteAction(record){
        const data = remove(record._links.self.href);
        Promise.resolve(data).then((value)=> {
            message.success("删除成功")
            this.loadFromServer();
        }).catch(function (value) {
            message.error("删除失败")
        })
    }
    componentDidMount() {
        this.loadFromServer();
    }
    loadFromServer() {
        const data = query();
        Promise.resolve(data).then((value)=> {
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
    createHandler(values,record) {
        let data;
        if (isEmptyObject(record)) {
            data = create(values);
        } else {
            console.log("用户创建",values)
            data = update(values, record._links.self.href);
        }
        Promise.resolve(data).then((value)=> {
            message.success("创建成功")
            this.loadFromServer();
        }).catch(function (value) {
            message.error("创建失败")
        })
    }
    render() {
        const columns = [
            {title: '姓名', dataIndex: 'username', key: 'username'},
            {title: '密码', dataIndex: 'password', key: 'password'},
            {title: '角色', dataIndex: 'rolesDescribe', key: 'rolesDescribe'},
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                        <Row>
                            <Col span="6"> <PCStaffModel record={record} onOk={this.createHandler.bind(this)}>
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