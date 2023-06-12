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
		visible: {
			type: 'boolean',
			value: true,
			label: '是否显示',
			componentType: 'exe-switch',
		},
		block: {
			visible: '${visible == true}',
			type: 'boolean',
			value: false,
			label: '是否为块级元素',
			componentType: 'exe-switch',
		},
		content: {
			type: 'string',
			value: '按钮',
			label: '按钮内容',
			visible: '${visible == true}',
		},
		disabled: {
			type: 'boolean',
			value: false,
			label: '是否禁用',
			componentType: 'exe-switch',
			visible: '${visible == true}',
		},
		ghost: {
			type: 'boolean',
			value: false,
			label: '幽灵模式',
			componentType: 'exe-switch',
			visible: '${visible == true}',
		},
	},
}
