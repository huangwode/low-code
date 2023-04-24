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
			value: '',
			label: '值',
		},
		placeholder: {
			type: 'string',
			value: '',
			label: '占位符',
		},
		align: {
			type: String as PropType<ExeInput['align']>,
			value: 'left' as ExeInput['align'],
			validator(val: ExeInput['align']): boolean {
				if (!val) return true
				return ['left', 'center', 'right'].includes(val)
			},
			label: '对齐方式',
			componentType: 'exe-select',
			props: {
				options: [
					{ label: '左对齐', value: 'left' },
					{ label: '中间对齐', value: 'center' },
					{ label: '右对齐', value: 'right' },
				],
			},
		},
		clearable: {
			type: Boolean,
			value: false,
			label: '是否可清空',
			componentType: 'exe-switch',
		},
	},
}
