import BaseModel from './base';
class Service extends BaseModel {
	static get_weixin_jsapi_params() {
        let qs = [];
        Object.keys({}).forEach(key => qs.push(key + '=' + filter[key]));
        return fetch(this.api_prefix + '/service/get_weixin_jsapi_params?' + qs.join('&'), {
            method: 'get',
            headers: new Headers({
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            })
        }).then(res => res.json());
	}
}
export default Service
