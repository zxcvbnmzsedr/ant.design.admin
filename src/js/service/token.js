/**
 * Created by tianzeng on 2017/5/17.
 */
import { request,isEmptyObject} from '../utils';
export async  function token (params) {
    return request('/token/', {
        method: 'POST',
        data: JSON.stringify(params)
    })
}