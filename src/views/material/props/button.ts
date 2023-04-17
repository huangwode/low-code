import { ExeButton, SizeOptions, COMPONENTTYPE } from '../material-types'
import { PropType } from 'vue'

type size = keyof SizeOptions

export default {
	componentConfig: {
		group: COMPONENTTYPE.base,
		componentName: '按钮',
		componentType: 'exe-button',
	},
	props: {
		block: {
			type: 'boolean',
			default: false,
			label: '是否为块级元素',
			value: null,
			componentType: 'exe-switch',
		},
		content: {
			type: 'string',
			default: '按钮',
			label: '按钮内容',
			value: null,
		},
		disabled: {
			type: 'boolean',
			default: false,
			label: '是否禁用',
			value: null,
			componentType: 'exe-switch',
		},
		ghost: {
			type: 'boolean',
			default: false,
			label: '幽灵模式',
			value: null,
			componentType: 'exe-switch',
		},
		// size: {
		// 	type: String as PropType<ExeButton['size']>,
		// 	default: 'fill' as ExeButton['size'],
		// 	validator(val: ExeButton['size']): boolean {
		// 		if (!val) return true
		// 		return ['left', 'center', 'right'].includes(val)
		// 	},
		// },
	},
}
