import * as types from '../mutation_types'
import ProductInstanceModel from 'api/product_instance'
import find from 'lodash/find'
import extend from 'lodash/extend'
const state = {
	detail: {
		sku_image: '',
		sku_props: '',
		product_name: '',
		product_props: ''
	}
}
const getters = {}
const actions = {
	product_instance_detail({
		commit
	}, {
		product_instance_code
	}) {
		let product_instance_model = new ProductInstanceModel({
			id: product_instance_code
		})
		return product_instance_model.get().then(json => {
			if (json.errcode) {
				commit(types.RECEIVE_ERROR, json)
			} else {
				commit(types.RECEIVE_PRODUCT_INSTANCE_DETAIL, json)
			}
			return json
		})
	},
}
const mutations = {
	[types.RECEIVE_PRODUCT_INSTANCE_DETAIL](state, {
		result
	}) {
		state.detail = result
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
