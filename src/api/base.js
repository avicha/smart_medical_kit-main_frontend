class BaseModel {
	constructor(attributes = {}) {
		for (let prop in attributes) {
			this[prop] = attributes[prop];
		}
	}
	static idAttribute = 'id';
	static api_prefix = '/api';
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
		let qs = [];
		Object.keys(filter).forEach(key => qs.push(key + '=' + filter[key]));
		return fetch(this.api_prefix + '/' + this.model_name + '/list?' + qs.join('&'), {
			method: 'get'
		}).then(res => res.json());
	}
	get() {
		let qs = [];
		let query = {
			[this.model_name + '_id']: this.getId()
		}
		if (this.token) {
			query.token = this.token;
		}
		Object.keys(query).forEach(key => qs.push(key + '=' + query[key]));
		return fetch(this.api_prefix + '/' + this.model_name + '/get?' + qs.join('&'), {
			method: 'get'
		}).then(res => res.json());
	}
	update() {
		let attributes = this.attributes;
		attributes[this.model_name + '_id'] = this.getId();
		delete attributes[this.idAttribute]
		return fetch(this.api_prefix + '/' + this.model_name + '/update', {
			method: 'post',
			headers: new Headers({
				'Content-Type': 'application/json; charset=UTF-8'
			}),
			body: JSON.stringify(attributes)
		}).then(res => res.json());
	}
	create() {
		let attributes = this.attributes;
		return fetch(this.api_prefix + '/' + this.model_name + '/create', {
			method: 'post',
			headers: new Headers({
				'Content-Type': 'application/json; charset=UTF-8'
			}),
			body: JSON.stringify(attributes)
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
		let qs = [];
		let query = {
			[this.model_name + '_id']: this.getId()
		}
		if (this.token) {
			query.token = this.token;
		}
		Object.keys(query).forEach(key => qs.push(key + '=' + query[key]));
		return fetch(this.api_prefix + '/' + this.model_name + '/delete?' + qs.join('&'), {
			method: 'get'
		}).then(res => res.json());
	}
}
export default BaseModel
