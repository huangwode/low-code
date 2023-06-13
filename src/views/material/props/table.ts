import { ExeButton, SizeOptions, COMPONENTTYPE, Eaction } from '../material-types'
import { PropType, computed } from 'vue'

import useGlobalData from '../../useGlobalData'
// import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
type size = keyof SizeOptions

const globalData = useGlobalData()

export default {
	componentConfig: {
		group: COMPONENTTYPE.layout,
		componentName: '表格',
		componentType: 'exe-table',
	},

	props: {
		visible: {
			type: 'boolean',
			value: true,
			label: '是否显示',
			componentType: 'exe-switch',
		},
		data: {
			visible: false,
			type: 'array',
			value: computed(() => globalData.tableDataRef.value).value,
			label: '数据源',
			// componentType: 'exe-select',
		},
		columns: {
			visible: false,
			type: 'array',
			value: globalData.tableColumns,
			label: '数据源',
			// componentType: 'exe-select',
		},
		bordered: {
			type: 'boolean',
			visible: true,
			label: '边框',
			value: true,
			componentType: 'exe-switch',
		},
		stripe: {
			type: 'boolean',
			visible: true,
			label: '斑马纹',
			value: true,
			componentType: 'exe-switch',
		},
	},
}
