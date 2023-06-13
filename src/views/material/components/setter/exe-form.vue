<template>
	<t-form :data="formData">
		<t-form-item label="姓名" name="name">
			<t-input v-model="formData.name" placeholder="请输入内容"></t-input>
		</t-form-item>

		<t-form-item>
			<t-space size="small">
				<t-button theme="primary" @click.stop="onSubmit">搜索</t-button>
				<t-button theme="default" variant="base" @click="onReset">重置</t-button>
			</t-space>
		</t-form-item>
	</t-form>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'

import useGlobalData from '../../../useGlobalData'
import { cloneDeep } from 'lodash-es'

const bus = getCurrentInstance()?.appContext.config.globalProperties.$bus

const globalData = useGlobalData()

const { getDefaultData } = globalData

type Events = {
	doSearch?: any
	doSearchTable?: any
	// eventTrigger?: Eaction
}

const formData = reactive({
	name: '',
})

const initialTableData = getDefaultData(6)

// bus.on('doSearch', data => {
// 	console.warn('exe--doSearch=>', data)
// 	bus.emit('doSearchTable', data)
// })

function emitSearch(data: any) {
	bus.emit('doSearch', data)

	console.warn('doSearch1111=>', data)
}
const onReset = () => {
	formData.name = ''
	// emitSearch(cloneDeep(initialTableData))
	bus.emit('doSearch', cloneDeep(initialTableData))

	console.warn('bus=>', bus)
	MessagePlugin.success('重置成功')
}
function filterTableData(name: string) {
	const filterData = initialTableData.filter(item => item.applicant?.includes(name))
	emitSearch(filterData)
}

const onSubmit = () => {
	console.warn('提交==>')
	const name = formData.name
	filterTableData(name)
	// if (validateResult === true) {

	// 	if (!name) {
	// 		MessagePlugin.error('请输入姓名进行查询')
	// 		return
	// 	}
	// 	bus.emit('eventTrigger', {
	// 		type: 'click',
	// 		Eevent: {
	// 			args: [name],
	// 			TriggerType: 'doSearch',
	// 		},
	// 	})
	// 	MessagePlugin.success('提交成功')
	// } else {
	// 	console.log('Validate Errors: ', firstError, validateResult)
	// 	MessagePlugin.warning(firstError)
	// }
}
</script>
<style lang="scss" scoped></style>
