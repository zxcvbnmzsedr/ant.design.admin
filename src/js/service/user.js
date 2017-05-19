/**
 * Created by tianzeng on 2017-03-16.
 */
import { request} from '../utils';
export async  function listAll (params) {
    return request('/users/', {
        method: 'GET',
        data: params
    })
}
export async  function createUser (params) {
    return request('/users/', {
        method: 'POST',
        data: JSON.stringify(params)
    })
}

export async  function updateUser (params,record) {
    console.log("更新URL地址",record._links.self.href.split('/users/')[1])
    return request('/users/'+record._links.self.href.split('/users/')[1], {
        method: 'PUT',
        data: JSON.stringify(params)
    })
}

export async  function deleteUser (record) {
    console.log("删除URL地址",record._links.self.href.split('/users/')[1])
    return request('/users/'+record._links.self.href.split('/users/')[1], {
        method: 'DELETE'
    })
}
