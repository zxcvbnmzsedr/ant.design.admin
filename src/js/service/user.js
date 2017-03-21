/**
 * Created by tianzeng on 2017-03-16.
 */
import { request} from '../utils';
export async  function login (params) {
    return request('/api/login', {
        method: 'post',
        data: params
    })
}