/**
 * Created by tianzeng on 17-5-2.
 */
import { request,isEmptyObject} from '../utils';
export async  function findAll () {
    return request('/roles/', {
        method: 'GET',
    })
}
export async  function createRoles (params) {
    return request('/roles', {
        method: 'POST',
        data: JSON.stringify(params)
    })
}

export async  function updateRoles (params,record) {
    console.log("更新URL地址",record._links.self.href.split('/roles/')[1])
    return request('/roles/'+record._links.self.href.split('/roles/')[1], {
        method: 'PUT',
        data: JSON.stringify(params)
    })
}

export async  function deleteRoles (record) {
    console.log("删除URL地址",record._links.self.href.split('/roles/')[1])
    return request('/roles/'+record._links.self.href.split('/roles/')[1], {
        method: 'DELETE'
    })
}