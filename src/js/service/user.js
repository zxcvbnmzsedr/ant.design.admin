/**
 * Created by tianzeng on 2017-03-16.
 */
import { request} from '../utils';
export async  function login (params) {
    return request('/user/query', {
        method: 'post',
        data: params
    })
}
export async  function query(params) {
    return request('/user/list', {
        method: 'get'
    })
}
export async  function remove(params) {
    return request('/user/remove/'+params, {
        method: 'delete'
    })
}
export async  function create(params) {
    return request('/user/create/', {
        method: 'post',
        data: params
    })
}
