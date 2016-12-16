// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import BaseModel from 'api/base'
BaseModel.api_prefix = (process.env.NODE_ENV == 'development' ? '/api' : '/api')
import store from 'store'
Vue.use(VueRouter)
const Index = resolve => require(['views/Index'], resolve)

const routes = [{
	name: 'index',
	path: '/',
	component: Index
},  {
	path: '*',
	component: Index
}]
const router = new VueRouter({
	routes,
	mode: 'history',
	linkActiveClass: 'active'
})

const app = new Vue({
	router,
	store
}).$mount('#app')
