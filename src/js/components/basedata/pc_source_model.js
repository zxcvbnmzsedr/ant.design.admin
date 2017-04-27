/**
 * Created by tianzeng on 17-4-26.
 */
/**
 * Created by tianzeng on 2017-03-26.
 */
import {Table, Popconfirm, Button,message ,Row,Col,Tree} from 'antd';
import React from 'react';
import {connect} from 'dva';
class PCSourceModel extends React.Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {

    }
    render() {

        return (
            <div>

            </div>
        );
    }
}
export default connect(({users}) => ({users}))(PCSourceModel)