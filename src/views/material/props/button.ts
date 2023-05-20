import { ExeButton, SizeOptions, COMPONENTTYPE, Eaction } from '../material-types'
import { PropType } from 'vue'

type size = keyof SizeOptions

export default {
	componentConfig: {
		group: COMPONENTTYPE.base,
		componentName: '按钮',
		componentType: 'exe-button',
	},
	actions: {
		type: 'click' as Eaction['type'],
		// args: [] as Eaction['args'],
		events: [] as Eaction['events'],
	},
	props: {
		block: {
			type: 'boolean',
			value: false,
			label: '是否为块级元素',
			componentType: 'exe-switch',
		},
		content: {
			type: 'string',
			value: '按钮',
			label: '按钮内容',
		},
		disabled: {
			type: 'boolean',
			value: false,
			label: '是否禁用',
			componentType: 'exe-switch',
		},
		ghost: {
			type: 'boolean',
			value: false,
			label: '幽灵模式',
			componentType: 'exe-switch',
		},
		// size: {
		// 	type: String as PropType<ExeButton['size']>,
		// 	value: 'fill' as ExeButton['size'],
		// 	validator(val: ExeButton['size']): boolean {
		// 		if (!val) return true
		// 		return ['left', 'center', 'right'].includes(val)
		// 	},
		// },
	},
}
