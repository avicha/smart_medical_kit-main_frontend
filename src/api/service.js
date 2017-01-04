import BaseModel from './base';
class Service extends BaseModel {
	static get_weixin_jsapi_params() {
        return BaseModel.http.get(this.api_prefix + '/service/get_weixin_jsapi_params').then(res => res.json());
	}
}
export default Service
