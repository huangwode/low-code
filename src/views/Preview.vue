<template>
	<div class="page">
		<h1 class="title" :style="pageData?.style ?? {}">{{ pageData?.title }}</h1>
		<div v-for="(component, index) in nodes" :key="index" class="component-item">
			<component :is="getComponent(component)" v-bind="materialProps(component)" @click="emitActions(component)" @change="changeValue($event, component)" />
		</div>
	</div>
</template>
<script setup lang="ts">
import exeForm from './material/components/setter/exe-form.vue'
import exeIconSelect from './material/components/setter/exe-icon-select.vue'
import { ref, reactive, computed, nextTick, getCurrentInstance } from 'vue'
import { COMPONENT_TYPE_NAME, ControlGroup, EControl, ENode, EPage, EProps, Eaction, Eevent } from './material/material-types'

import { componentsMap } from './material/enum'

import { actionsMap } from './material/actions'
import { cloneDeep } from 'lodash-es'

const bus = getCurrentInstance()?.appContext.config.globalProperties.$bus

type Events = {
	doSearch?: any
	eventTrigger?: Eaction
	doSearchTable?: any
}

// const bus: Emitter<Events> = mitt<Events>()

const pageData = ref<EPage>()

// const bus = mitt()

const nodes = computed(() => {
	return pageData.value?.nodes ?? []
})

function initData() {
	const data = localStorage.getItem('lowCodePageData')
	console.log('data=>', data)
	try {
		if (data) {
			pageData.value = JSON.parse(data)
			console.log('pageData=>', pageData.value)
		}
	} catch (error) {
		console.log(error)
	}
}
function changeValue(val: unknown, node: ENode) {
	const componentType = node.type
	// 简单实现输入框输入
	if (componentType === 'exe-input' && node.props) {
		node.props.value.value = val
	}
}

initData()

// 替换表格数据
function setTableData(data: any) {
	nodes.value.forEach(node => {
		if (node.type === 'exe-table') {
			;(node.props as EProps).data.value = data
		}
	})
}

bus.on('doSearch', (data: any) => {
	console.warn('doSearch=>', data)
	// alert('doSearch')
	setTableData(data)
})

const getComponent = computed(() => (node: ENode) => {
	const componentType = node.type
	if (componentType === 'exe-form') {
		return exeForm
	}
	return componentsMap[componentType]
})

const materialProps = computed(() => (item: EProps) => {
	const props = item.props

	const keys = Object.keys(props)
	const propsData = {}
	keys.forEach(key => {
		propsData[key] = props[key]?.value
	})
	return propsData
})

// 派发事件
function emitActions(component: ENode) {
	const actions = component.actions
	if (actions?.events) {
		bus.emit('eventTrigger', actions)
	}
}

bus.on('eventTrigger', (actions: Eaction) => {
	console.log('监听actions', actions)
	const events = (actions as Eaction).events
	executeActions(cloneDeep(events))
})

// 异步执行actions

async function executeActions(actions: Eaction['events']) {
	if (actions.length > 0) {
		const currentAction = actions.shift()

		const currrentFun = actionsMap[(currentAction as Eevent).triggerType]

		console.log('currrentFun=>', currrentFun)

		// 表单搜索
		// if (currrentFun === 'doSearch') {
		// } else {
		// }
		await (currrentFun as any).apply(null, currentAction?.args)

		if (actions.length > 0) {
			executeActions(actions)
		}
	}
}
</script>
<style lang="scss" scoped>
.page {
	padding: 12px;
	.title {
		margin-bottom: 24px;

		text-align: center;
	}
	.component-item {
		margin-bottom: 12px;
	}
}
</style>
