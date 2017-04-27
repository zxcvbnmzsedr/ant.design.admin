/**
 * Created by tianzeng on 2017-03-16.
 */
import { request,isEmptyObject} from '../utils';
export async  function findAll () {
    return request('/sources', {
        method: 'get',
    })
}
