/**
 * Created by tianzeng on 2017-03-16.
 */
import { request,isEmptyObject} from '../utils';
export async  function findAll () {
    return request('/sources', {
        method: 'GET',
    })
}

export async  function createSource (params) {
    return request('/sources', {
        method: 'POST',
        data: JSON.stringify(params)
    })
}

export async  function updateSource (params,record) {
    console.log("更新URL地址",record._links.self.href.split('/sources/')[1])
    return request('/sources/'+record._links.self.href.split('/sources/')[1], {
        method: 'PUT',
        data: JSON.stringify(params)
    })
}

export async  function deleteSource (record) {
    console.log("删除URL地址",record._links.self.href.split('/sources/')[1])
    return request('/sources/'+record._links.self.href.split('/sources/')[1], {
        method: 'DELETE'
    })
}