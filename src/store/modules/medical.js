import * as types from '../mutation_types'
import MedicalModel from 'api/medical'

const state = {

}
const getters = {}
const actions = {
	medical_scan({
		commit
	}, {
		barcode
	}) {
		return MedicalModel.scan(barcode).then(json => {
			if (json.errcode) {
				commit(types.RECEIVE_ERROR, json)
			}
			return json
		})
	}
}
const mutations = {

}
export default {
	state,
	getters,
	actions,
	mutations
}
