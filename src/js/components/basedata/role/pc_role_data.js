/**
 * Created by tianzeng on 17-4-26.
 */
/**
 * Created by tianzeng on 2017-03-26.
 */
import {Table, Popconfirm, Button,message ,Row,Col,Tree} from 'antd';
import React from 'react';
import {connect} from 'dva';
import {findAll,updateRoles} from '../../../service/roles';
import PCRoleModel from './pc_role_model'

const TreeNode = Tree.TreeNode;

class PCRoleData extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }
    componentWillMount() {
        this.loadFromServer();
    }
    loadFromServer() {
        const data = findAll();
        Promise.resolve(data).then((value)=> {
            const data= [];
            value.obj.map((c,index)=>{
                data.push({key:c.roleId,name:c.name,description:c.description});
                console.log(data[index])
            });
            this.setState({
                data:data
            })
        }).catch((value)=> {
            Promise.resolve(value).then((value)=>{
                message.error("请求失败:"+value.message)
            })
        })
    }
    createHandler(values,record) {
        console.log("权限更新",values,record);

        const data = updateRoles(values,record);

        Promise.resolve(data).then((value)=> {
            message.success("创建成功")
            this.loadFromServer();
        }).catch(function (value) {
            message.error("创建失败")
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
                            <PCRoleModel record={record} onOk={this.createHandler.bind(this,record)}>
                                <Button type="primary">编辑</Button>
                            </PCRoleModel>
                        </Col>
                    </Col>
                    <Col span="6">
                    <Popconfirm title="确定删除资源?" okText="是" cancelText="否">
                        <Button href="#">删除</Button>
                    </Popconfirm></Col>
                </Row>
            ),
        }];
        return (
            <div>
                <Table columns={columns} dataSource={this.state.data} />
            </div>
        );
    }

}
export default connect(({users}) => ({users}))(PCRoleData)