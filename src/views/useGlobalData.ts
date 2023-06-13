import { ref } from 'vue'

type TableData = Record<string, any>

function getDefaultData(total: number) {
	const data = []
	for (let i = 0; i < total; i++) {
		data.push({
			index: i,
			applicant: ['贾明', '张三', '王芳', '老六', '李四', '李淳罡'][i % 6],
			status: i % 3,
			channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
			detail: {
				email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
			},
			matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
			time: [2, 10, 1][i % 3],
			createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
		})
	}

	return data
}

function getDefaultColumns() {
	return [
		{ colKey: 'applicant', title: '申请人', width: 100 },
		{
			colKey: 'status',
			title: '审批状态',
			cell: (h, { row }) => {
				const statusNameListMap = {
					0: { label: '审批通过', theme: 'success' },
					1: { label: '审批失败', theme: 'danger' },
					2: { label: '审批过期', theme: 'warning' },
				}
				return statusNameListMap[row.status].label
			},
		},
		{
			colKey: 'time',
			title: '申请耗时(天)',

			align: 'center',
			// 设置单元格类名
			className: ({ row }) => {
				if (row.time >= 9) {
					return 'custom-cell-class-name'
				}
				return ''
			},
		},
		{
			colKey: 'channel',
			title: '签署方式',
			align: 'right',
			className: () => 'custom-cell-class-name',
		},
		{
			colKey: 'detail.email',
			title: '邮箱地址',
			ellipsis: true,
		},
		{ colKey: 'createTime', title: '申请时间' },
	]
}

export default function () {
	const tableDataRef = ref<TableData[]>(getDefaultData(6))
	let tableColumns = ref(getDefaultColumns())
	return {
		tableDataRef,
		tableColumns,
		getDefaultColumns,
		getDefaultData,
	}
}
