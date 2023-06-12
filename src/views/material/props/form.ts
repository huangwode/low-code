import { COMPONENTTYPE } from '../material-types'
import { PropType } from 'vue'

export default {
	componentConfig: {
		group: COMPONENTTYPE.layout,
		componentName: '表单',
		componentType: 'exe-form',
	},
	props: {
		data: {
			type: 'object',
			value: {},
			label: '表单数据',
			visible: false,
		},
		disabled: {
			type: 'boolean',
			value: false,
			label: '是否禁用',
			componentType: 'exe-switch',
			visible: '${visible == true}',
		},
	},
}
