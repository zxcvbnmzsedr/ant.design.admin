/**
 * Created by tianzeng on 2017-03-26.
 */
import {Table, Popconfirm, Button,message ,Row,Col} from 'antd';
import React from 'react';
import {connect} from 'dva';
import PCStaffModel from './pc_staff_model';
class PCStaffData extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.dispatch({type: 'users/listAll', payload: ""});
    }
    handleDeleteAction(id){
        this.props.dispatch({
            type:'users/remove',
            payload: {id}
        })
    }
    createHandler(values) {
        this.props.dispatch({
            type: 'users/create',
            payload: values,
        });
    }
    render() {
        const columns = [
            {title: '姓名', dataIndex: 'teacherName', key: 'teacherName'},
            {title: '工号', dataIndex: 'jobNumber', key: 'jobNumber'},
            {title: '部门', dataIndex: 'department', key: 'department'},
            {title: '联系方式', dataIndex: 'contactInformation', key: 'contactInformation'},
            {title: '籍贯', dataIndex: 'nativePlace', key: 'nativePlace'},
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                        <Row>
                            <Col span="6"> <PCStaffModel record={record} onOk={this.createHandler.bind(this)}>
                                <Button type="primary">编辑</Button>
                            </PCStaffModel></Col>
                            <Col span="6"><Popconfirm title="确定删除用户?" onConfirm={this.handleDeleteAction.bind(this,record.jobNumber)} okText="是" cancelText="否">
                                <Button href="#">删除</Button>
                            </Popconfirm></Col>
                        </Row>
                ),
            }
        ];
        const {list,queryMessage} = this.props.users;
        const data = list.content;
        const {dispatch} = this.props;
        if((queryMessage.deleteMessage||"").length > 0){
            message.error(queryMessage.deleteMessage)
        }
        var pagination = {
            total: list.length,
            defaultCurrent: 1,
            pageSize: 5,
            onChange(current) {
                this.current = current
                dispatch({
                    type: 'users/listAll',
                    payload: {size: 5, page: current}
                });
            }
        };

        return (
            <div>
                <div>
                    <PCStaffModel record={{}} onOk={this.createHandler.bind(this)}>
                        <Button type="primary">创建用户</Button>
                    </PCStaffModel>
                </div>
                <Table rowKey="id" columns={columns} dataSource={data} pagination={pagination}/>
            </div>
        );
    }
}
export default connect(({users}) => ({users}))(PCStaffData)