import { ExeIcon, COMPONENTTYPE } from '../material-types'
import { PropType } from 'vue'

export default {
	componentConfig: {
		group: COMPONENTTYPE.layout,
		componentName: '图标',
		componentType: 'exe-icon',
	},
	props: {
		name: {
			type: 'string',
			value: 'add-rectangle',
			label: '图标名称',
			componentType: 'exe-icon-select',
			// props: {
			// 	options: [
			// 		{ label: 'circle', value: 'circle' },
			// 		{ label: 'round', value: 'round' },
			// 		{ label: 'square', value: 'square' },
			// 	],
			// },
		},
		size: {
			type: 'string',
			value: '',
			label: '尺寸',
			componentType: 'exe-select',
			props: {
				options: [
					{ label: '小', value: 'small' },
					{ label: '中等', value: 'medium' },
					{ label: '大', value: 'large' },
				],
			},
		},

		// url: {
		// 	type: [String, Array] as PropType<ExeIcon['url']>,
		// },
	},
}
