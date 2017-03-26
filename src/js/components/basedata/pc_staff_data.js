/**
 * Created by tianzeng on 2017-03-26.
 */
import {Table, Badge, Menu, Dropdown, Icon} from 'antd';
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

        const menu = (
            <Menu>
                <Menu.Item>
                    Action 1
                </Menu.Item>
                <Menu.Item>
                    Action 2
                </Menu.Item>
            </Menu>
        );
        const columns = [
            {title: '姓名', dataIndex: 'teacherName', key: 'teacherName'},
            {title: '工号', dataIndex: 'jobNumber', key: 'jobNumber'},
            {title: '部门', dataIndex: 'department', key: 'department'},
            {title: '联系方式', dataIndex: 'contactInformation', key: 'contactInformation'},
            {title: '籍贯', dataIndex: 'nativePlace', key: 'nativePlace'},
        ];
        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i,
                date: '2014-12-24 23:12:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56',
            });
        }
        return (
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        );
    }
}

export default connect(({users}) => ({users}))(PCStaffData)