<template>
	<div class="page">
		<h1 class="title" :style="pageData?.style ?? {}">{{ pageData?.title }}</h1>
		<div v-for="(component, index) in nodes" :key="index" class="component-item">
			<component :is="getComponent(component)" v-bind="materialProps(component)" @click="emitActions(component)" @change="changeValue($event, component)" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { COMPONENT_TYPE_NAME, ControlGroup, EControl, ENode, EPage, EProps, Eaction, Eevent } from './material/material-types'

import { componentsMap } from './material/enum'

import { actionsMap } from './material/actions'
import { cloneDeep } from 'lodash-es'
import mitt from 'mitt'

const pageData = ref<EPage>()

const emitter = mitt()

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

const getComponent = computed(() => (node: ENode) => {
	const componentType = node.type
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
		emitter.emit('eventTrigger', actions)
	}
}

emitter.on('eventTrigger', actions => {
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
		if (currrentFun === 'doSearch') {
		} else {
			await (currrentFun as any).apply(null, currentAction?.args)
		}

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
