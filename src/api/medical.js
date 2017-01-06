import BaseModel from './base';
class MedicalModel extends BaseModel {
	static model_name = 'medical';
	constructor(props) {
		super(props);
	}
	static scan(barcode) {
		return BaseModel.http.get(this.api_prefix + '/' + this.model_name + '/scan', {
			params: {
				barcode: barcode
			}
		}).then(res => res.json());
	}
}
export default MedicalModel
