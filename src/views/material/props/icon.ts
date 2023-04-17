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
			default: 'add-rectangle',
			label: '图标名称',
			value: null,
		},
		// size: {
		// 	type: 'string',
		// 	default: '',
		// 	label: '尺寸',
		// value:null,
		// },

		// url: {
		// 	type: [String, Array] as PropType<ExeIcon['url']>,
		// },
	},
}
