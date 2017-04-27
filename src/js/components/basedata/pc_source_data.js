/**
 * Created by tianzeng on 17-4-26.
 */
/**
 * Created by tianzeng on 2017-03-26.
 */
import {Table, Popconfirm, Button,message ,Row,Col,Tree} from 'antd';
import React from 'react';
import {connect} from 'dva';
import {findAll} from '../../service/source'
const TreeNode = Tree.TreeNode;
class PCSourceData extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }
    loadFromServer() {
        const data = findAll();
        Promise.resolve(data).then((value)=> {
            const data= [];
            value.obj.map((c,index)=>{
                data.push({key:c.id,name:c.name,description:c.description,children:[]});
                console.log(data[index])
                const children = [];
                for (const i in c.permissions){
                    const permissions = c.permissions[i];
                    children.push({
                        key:permissions.id+""+c.id,
                        description:permissions.description,
                        name:permissions.permissions
                    });
                }
                data[index].children = children;
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
    componentWillMount() {
        this.loadFromServer();
    }
    render() {
        const columns = [{
            title: '资源名称',
            dataIndex: 'description',
            key: 'description',
            width: '40%',
        }, {
            title: '资源路径',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
        }];

        return (
            <div>
                <Table columns={columns} dataSource={this.state.data} />
            </div>
        );
    }
}
export default connect(({users}) => ({users}))(PCSourceData)