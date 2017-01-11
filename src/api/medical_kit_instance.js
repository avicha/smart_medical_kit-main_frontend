import BaseModel from './base';
class MedicalKitInstanceModel extends BaseModel {
	static model_name = 'medical_kit_instance';
	constructor(props) {
		super(props);
	}
	set_setting({
		setting,
		box_settings
	}) {
		return BaseModel.http.post(this.api_prefix + '/' + this.model_name + '/set_setting', {
			medical_kit_instance_id,
			setting,
			box_settings
		}).then(res => res.json());
	}
}
export default MedicalKitInstanceModel
