/**
 * Created by tianzeng on 17-4-26.
 */
/**
 * Created by tianzeng on 2017-03-26.
 */
import {Table, Popconfirm, Button,message ,Row,Col,Tree} from 'antd';
import React from 'react';
import {connect} from 'dva';
import {findAll,createSource,deleteSource,updateSource} from '../../../service/source';
import PCSourceModel from './pc_source_model';
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
            this.setState({
                data:value._embedded.sources
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
    handleDeleteAction(record){
        const data = deleteSource(record);
        Promise.resolve(data).then((value)=> {
            message.success("删除成功")
            this.loadFromServer();
        }).catch((value)=> {
            Promise.resolve(value).then((value)=>{
                message.error("请求失败:"+value.message)
            })
        })
    }
    /**
     * 创建资源
     * @param values
     * @param action
     */
    createHandler(values) {
        console.log("创建用户",values);
        const data = createSource(values);
        Promise.resolve(data).then((value)=> {
            console.log("返回的结果",value);
            this.loadFromServer();
        }).catch((value)=> {
            Promise.resolve(value).then((value)=>{
                message.error("请求失败:"+value.message)
            })
        })
    }
    updateHandler(values,record) {
        console.log("创建用户",values);
        const data = updateSource(values,record);
        Promise.resolve(data).then((value)=> {
            console.log("返回的结果",value);
            this.loadFromServer();
        }).catch((value)=> {
            Promise.resolve(value).then((value)=>{
                message.error("请求失败:"+value.message)
            })
        })
    }
    render() {
        const columns = [{
            title: '资源名称',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
        }, {
            title: '资源路径',
            dataIndex: 'httpUrl',
            key: 'httpUrl',
            width: '30%',
        },{
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Row>
                    <Col span="6">
                        <PCSourceModel record={record} onOk={this.updateHandler.bind(this)}>
                            <Button type="primary">编辑</Button>
                        </PCSourceModel>
                    </Col>
                    <Col span="6"><Popconfirm title="确定删除资源?" onConfirm={this.handleDeleteAction.bind(this,record)} okText="是" cancelText="否">
                        <Button href="#">删除</Button>
                    </Popconfirm></Col>
                </Row>
            ),
        }];

        return (
            <div>
                <div>
                    <PCSourceModel record={{}} onOk={this.createHandler.bind(this)}>
                        <Button type="primary">创建资源</Button>
                    </PCSourceModel>
                </div>
                <Table columns={columns} dataSource={this.state.data} />
            </div>
        );
    }
}
export default connect(({users}) => ({users}))(PCSourceData)