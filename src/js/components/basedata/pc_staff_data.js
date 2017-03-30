/**
 * Created by tianzeng on 2017-03-26.
 */
import {Table} from 'antd';
import React from 'react';
import { connect } from 'dva';

class PCStaffData extends React.Component {
    constructor(){
        super();

    }
    componentWillMount(){
        this.props.dispatch({type: 'users/listAll',payload: ""});
    }
    render() {
        const columns = [
            {title: '姓名', dataIndex: 'teacherName', key: 'teacherName'},
            {title: '工号', dataIndex: 'jobNumber', key: 'jobNumber'},
            {title: '部门', dataIndex: 'department', key: 'department'},
            {title: '联系方式', dataIndex: 'contactInformation', key: 'contactInformation'},
            {title: '籍贯', dataIndex: 'nativePlace', key: 'nativePlace'},
        ];
        const {list} = this.props.users;
        const {dispatch} = this.props;
        const data = list.content;
        console.log(list.content);
        var pagination = {
            total: list.length,
            defaultCurrent: 1,
            pageSize: 5,
            onChange(current) {
                this.current = current
                dispatch({
                    type: 'users/listAll',
                    payload: {size:5, page:current}
                });
            }
        };
        return (
            <Table rowKey="id" columns={columns} dataSource={data} pagination={pagination} />
        );
    }
}

export default connect(({users}) => ({users}))(PCStaffData)