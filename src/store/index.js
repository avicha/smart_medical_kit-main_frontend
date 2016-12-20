import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import product_instance from './modules/product_instance'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules: {
		product_instance,
	},
	strict: debug,
	plugins: []
})
