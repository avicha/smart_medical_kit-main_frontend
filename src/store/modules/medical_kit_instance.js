import * as types from '../mutation_types'
import MedicalKitInstanceModel from 'api/medical_kit_instance'

const state = {
	detail: {
		id: '',
		product_code: '',
		name: '',
		image: '',
		box_count: 0
	},
	box_settings: []
}
const getters = {}
const actions = {
	medical_kit_instance_detail({
		commit
	}, {
		medical_kit_instance_id
	}) {
		let medical_kit_instance_model = new MedicalKitInstanceModel({
			id: medical_kit_instance_id
		})
		return medical_kit_instance_model.get().then(json => {
			if (json.errcode) {
				commit(types.RECEIVE_ERROR, json)
			} else {
				commit(types.RECEIVE_MEDICAL_KIT_INSTANCE_DETAIL, json)
			}
			return json
		})
	},
}
const mutations = {
	[types.RECEIVE_MEDICAL_KIT_INSTANCE_DETAIL](state, {
		result
	}) {
		state.detail = result
		state.box_settings = []
		for (let i = 0; i < result.box_count; i++) {
			state.box_settings.push({
				medical_kit_instance_id: result.id,
				box_index: i + 1,
				medical_name: '',
				medical_barcode: null,
				schedule_times: [],
				piece_per_time: 1,
				unit: '粒'
			})
		}
	},
	[types.REMOVE_MEDICAL_INSTANCE_BOX_SCHEDULE_TIME](state, {
		index,
		time
	}) {
		let i = state.box_settings[index].schedule_times.indexOf(time)
		if (~i) {
			state.box_settings[index].schedule_times.splice(i, 1)
		}
	},
	[types.ADD_MEDICAL_INSTANCE_BOX_SCHEDULE_TIME](state, {
		index,
		time
	}) {
		let i = state.box_settings[index].schedule_times.indexOf(time)
		if (!~i) {
			state.box_settings[index].schedule_times.push(time)
			state.box_settings[index].schedule_times.sort()
		}
	},
	[types.ADD_MEDICAL_INSTANCE_BOX_PIECE_PER_TIME](state, {
		index
	}) {
		state.box_settings[index].piece_per_time++
	},
	[types.MINUS_MEDICAL_INSTANCE_BOX_PIECE_PER_TIME](state, {
		index
	}) {
		if (state.box_settings[index].piece_per_time > 1) {
			state.box_settings[index].piece_per_time--
		}
	}
}
export default {
	state,
	getters,
	actions,
	mutations
}
