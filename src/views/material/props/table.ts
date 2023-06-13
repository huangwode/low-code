import { ExeButton, SizeOptions, COMPONENTTYPE, Eaction } from '../material-types'
import { PropType } from 'vue'

import { tableData, tableColumns } from '../../global-data'
// import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
type size = keyof SizeOptions

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
			value: tableData.value,
			label: '数据源',
			// componentType: 'exe-select',
		},
		columns: {
			visible: false,
			type: 'array',
			value: tableColumns.value,
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
