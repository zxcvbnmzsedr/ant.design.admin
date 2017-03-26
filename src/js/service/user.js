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