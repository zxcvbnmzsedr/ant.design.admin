/**
 * Created by tianzeng on 2017-03-16.
 */
import { request,isEmptyObject} from '../utils';
export async  function login (params) {
    return request('/users/login', {
        method: 'POST',
        data: params
    })
}
export async  function query(params) {
    return request('/users', {
        method: 'get'
    })
}
export async  function remove(params) {
    params = params.split('/api')[1];
    return request(params, {
        method: 'delete'
    })
}
export async  function create(params) {
    return request('/users', {
        method: 'post',
        data: JSON.stringify(params)
    })
}

export async  function update(params,url) {
    url = url.split('/api')[1];
    return request(url, {
        method: 'put',
        data: JSON.stringify(params)
    })
}

export async  function queryRoles(params) {
    params = params.split('/api')[1];
    return request(params, {
        method: 'get'
    })
}