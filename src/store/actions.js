import * as types from './mutation_types'
import Service from 'api/service'
export default {
	get_weixin_jsapi_params({
		commit
	}) {
		return Service.get_weixin_jsapi_params().then(json => {
			if (json.errcode) {
				commit(types.RECEIVE_ERROR, json)
			}
			return json
		})
	},
	download_weixin_media({
		commit
	}, media_id) {
		return Service.download_weixin_media(media_id).then(json => {
			if (json.errcode) {
				commit(types.RECEIVE_ERROR, json)
			}
			return json
		})
	}
}
