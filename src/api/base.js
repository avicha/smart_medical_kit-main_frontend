let Vue = require('vue')
let VueResource = require('vue-resource')
Vue.use(VueResource)

class BaseModel {
	constructor(attributes = {}) {
		for (let prop in attributes) {
			this[prop] = attributes[prop];
		}
	}
	static idAttribute = 'id';
	static api_prefix = '/api';
	static http = Vue.http;
	clone() {
		return new this.constructor(this.attributes);
	}
	getId() {
		return this.attributes[this.idAttribute];
	}
	get idAttribute() {
		return this.constructor.idAttribute;
	}
	get api_prefix() {
		return this.constructor.api_prefix;
	}
	get model_name() {
		return this.constructor.model_name;
	}
	get attributes() {
		let attributes = {};
		for (let prop in this) {
			attributes[prop] = this[prop];
		}
		return attributes;
	}
	static list(filter = {}) {
		return Vue.http.get(this.api_prefix + '/' + this.model_name + '/list', {
			params: filter
		}).then(res => res.json());
	}
	get() {
		let query = {
			[this.model_name + '_id']: this.getId()
		}
		if (this.token) {
			query.token = this.token;
		}
		return Vue.http.get(this.api_prefix + '/' + this.model_name + '/get', {
			params: query
		}).then(res => res.json());
	}
	update() {
		let attributes = this.attributes;
		attributes[this.model_name + '_id'] = this.getId();
		delete attributes[this.idAttribute]
		return Vue.http.post(this.api_prefix + '/' + this.model_name + '/update', {
			body: attributes
		}).then(res => res.json());
	}
	create() {
		let attributes = this.attributes;
		return Vue.http.post(this.api_prefix + '/' + this.model_name + '/create', {
			body: attributes
		}).then(res => res.json());
	}
	save() {
		let id = this.getId();
		if (id) {
			return this.update();
		} else {
			return this.create();
		}
	}
	delete() {
		let query = {
			[this.model_name + '_id']: this.getId()
		}
		if (this.token) {
			query.token = this.token;
		}
		return Vue.http.get(this.api_prefix + '/' + this.model_name + '/delete', {
			params: query
		}).then(res => res.json());
	}
}
export default BaseModel