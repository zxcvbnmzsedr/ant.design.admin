/**
 * Created by tianzeng on 2017-03-26.
 */
import {Table, Popconfirm, Button,message } from 'antd';
import React from 'react';
import {connect} from 'dva';
class PCStaffData extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.dispatch({type: 'users/listAll', payload: ""});
    }
    componentDidUpdate(){
    }

    handleDeleteAction(id){
        this.props.dispatch({
            type:'users/remove',
            payload: {id}
        })
    }

    render() {
        const columns = [
            {title: '姓名', dataIndex: 'teacherName', key: 'teacherName'},
            {title: '工号', dataIndex: 'jobNumber', key: 'jobNumber'},
            {title: '部门', dataIndex: 'department', key: 'department'},
            {title: '联系方式', dataIndex: 'contactInformation', key: 'contactInformation'},
            {title: '籍贯', dataIndex: 'nativePlace', key: 'nativePlace'},
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Popconfirm title="确定删除用户?" onConfirm={this.handleDeleteAction.bind(this,record.jobNumber)} okText="是" cancelText="否">
                        <Button href="#">删除</Button>
                    </Popconfirm>
                ),
            }
        ];
        const {list,queryMessage} = this.props.users;
        const data = list.content;
        const {dispatch} = this.props;
        if((queryMessage.deleteMessage||"").length > 0){
            message.error(queryMessage.deleteMessage)
        }
        console.log(list.content);
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
            <Table rowKey="id" columns={columns} dataSource={data} pagination={pagination}/>
        );
    }
}
export default connect(({users}) => ({users}))(PCStaffData)