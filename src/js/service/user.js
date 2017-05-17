/**
 * Created by tianzeng on 2017-03-16.
 */
import { request} from '../utils';
export async  function listAll (params) {
    return request('/users/', {
        method: 'POST',
        data: params
    })
}