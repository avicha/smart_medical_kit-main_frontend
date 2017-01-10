import BaseModel from './base';
class Service extends BaseModel {
	static get_weixin_jsapi_params() {
        return BaseModel.http.get(this.api_prefix + '/service/get_weixin_jsapi_params').then(res => res.json());
	}
	static download_weixin_media(media_id){
		return BaseModel.http.get(this.api_prefix + '/service/download_weixin_media').then(res => res.json());
	}
}
export default Service
