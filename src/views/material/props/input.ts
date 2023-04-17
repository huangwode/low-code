import { ExeInput, COMPONENTTYPE } from '../material-types'
import { PropType } from 'vue'

export default {
	componentConfig: {
		group: COMPONENTTYPE.input,
		componentName: '输入框',
		componentType: 'exe-input',
	},
	props: {
		value: {
			type: 'string',
			default: '',
			label: '值',
			value: null,
		},
		placeholder: {
			type: 'string',
			default: '',
			label: '占位符',
			value: null,
		},
		align: {
			type: String as PropType<ExeInput['align']>,
			default: 'fill' as ExeInput['align'],
			validator(val: ExeInput['align']): boolean {
				if (!val) return true
				return ['left', 'center', 'right'].includes(val)
			},
			label: '对齐方式',
			value: null,
		},
		clearable: {
			type: Boolean,
			default: false,
			label: '清空',
			value: null,
			componentType: 'exe-switch',
		},
	},
}
