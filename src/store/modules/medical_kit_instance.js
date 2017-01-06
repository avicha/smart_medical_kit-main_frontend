import * as types from '../mutation_types'
import MedicalKitInstanceModel from 'api/medical_kit_instance'
import extend from 'lodash/extend'

const state = {
	detail: {
		id: '',
		product_code: '',
		name: '',
		image: '',
		box_count: 0,
		box_settings: [],
		setting: null
	},
	box_setting_index: 0
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
	},
	[types.SET_MEDICAL_INSTANCE_BOX_SETTING_INDEX](state, {
		index
	}) {
		state.box_setting_index = index
	},
	[types.REMOVE_MEDICAL_INSTANCE_BOX_SCHEDULE_TIME](state, {
		index,
		time
	}) {
		let i = state.detail.box_settings[index].schedule_times.indexOf(time)
		if (~i) {
			state.detail.box_settings[index].schedule_times.splice(i, 1)
		}
	},
	[types.ADD_MEDICAL_INSTANCE_BOX_SCHEDULE_TIME](state, {
		index,
		time
	}) {
		let i = state.detail.box_settings[index].schedule_times.indexOf(time)
		if (!~i) {
			state.detail.box_settings[index].schedule_times.push(time)
			state.detail.box_settings[index].schedule_times.sort()
		}
	},
	[types.ADD_MEDICAL_INSTANCE_BOX_PIECE_PER_TIME](state, {
		index
	}) {
		state.detail.box_settings[index].piece_per_time++
	},
	[types.MINUS_MEDICAL_INSTANCE_BOX_PIECE_PER_TIME](state, {
		index
	}) {
		if (state.detail.box_settings[index].piece_per_time > 1) {
			state.detail.box_settings[index].piece_per_time--
		}
	},
	[types.SET_MEDICAL_INSTANCE_BOX_MEDICAL](state, {
		index,
		medical,
	}) {
		extend(state.detail.box_settings[index], medical)
	}
}
export default {
	state,
	getters,
	actions,
	mutations
}
