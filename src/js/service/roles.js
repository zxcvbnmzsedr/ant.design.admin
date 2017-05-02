/**
 * Created by tianzeng on 17-5-2.
 */
import { request,isEmptyObject} from '../utils';
export async  function findAll () {
    return request('/roles', {
        method: 'get',
    })
}
export async  function updateRoles (params,url) {
    return request('/roles/'+params.key, {
        method: 'put',
        data: JSON.stringify(url)
    })
}