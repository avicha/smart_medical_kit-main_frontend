import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'
import medical_kit_instance from './modules/medical_kit_instance'
import medical from './modules/medical'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules: {
		medical_kit_instance,
		medical
	},
	strict: debug,
	plugins: []
})
