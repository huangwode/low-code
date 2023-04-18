<template>
	<h1 class="header">低代码</h1>
	<div class="code-container">
		<div class="left" :class="{ collapse: stencilCollapseStatus }">
			<div v-for="(group, index) in materiaGroup" :key="index" class="material-group">
				<div class="group-title">{{ group.title }}</div>
				<draggable
					:list="group.data"
					ghost-class="ghost"
					:clone="cloneDraggeComponent"
					:force-fallback="true"
					:group="{ name: 'list', pull: 'clone', put: false }"
					:sort="false"
					item-key="id"
					@start="draggeStart"
					@end="draggeEnd($event, group.data)"
				>
					<template #item="{ element }">
						<t-tag class="materia-item">{{ element.componentConfig.componentName }}</t-tag>
					</template>
				</draggable>
			</div>

			<toggle-icon v-model="stencilCollapseStatus" />
		</div>
		<div class="center">
			<draggable
				:list="widgetList"
				ghost-class="ghost"
				class="component-list"
				item-key="id"
				:force-fallback="true"
				:group="{ pull: 'clone', name: 'list' }"
				:fallback-class="true"
				:fallback-on-body="true"
			>
				<template #item="{ element }">
					<div class="component-item">
						<component :is="getComponent(element)" v-bind="materialProps(element)" @click="handleClickComponent(element)" @focus="handleClickComponent(element)" />
					</div>
				</template>
			</draggable>
		</div>
		<div class="right">
			<div class="">
				<t-form>
					<t-form-item v-for="(item, index) in activePropsList" :key="index" :label="item.label">
						<!-- <t-input v-model="item.default"></t-input> -->
						<component :is="getPropsComponent(item)" v-model="item.default" v-bind="getPropsValue(item)" />
					</t-form-item>
				</t-form>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { cloneDeep, toArray } from 'lodash-es'
import draggable from 'vuedraggable'
import { getMaterialList } from './material/index'
import ToggleIcon from '@/components/ToggleIcon.vue'
import { COMPONENT_TYPE_NAME } from './material/material-types'

import { componentsMap } from './material/enum'
// import ExeIconSelect from './material/components/exe-icon-select.vue'
import { uuid } from '@/utils'

// 左侧收起状态
const stencilCollapseStatus = ref(false)
const materialProps = computed(() => (item: any) => {
	const props = item.props

	const keys = Object.keys(props)
	const propsData = {}
	keys.forEach(key => {
		propsData[key] = props[key]?.default
	})
	return propsData
})

const propList = ref<Array<any>>([])

const draggeId = ref('')

function cloneDraggeComponent(item: any) {
	const cloneData = cloneDeep(item)
	cloneData.id = uuid()
	draggeId.value = cloneData.id
	return cloneData
}

async function handlePropsGroup() {
	const list = await getMaterialList()
	propList.value = list
	const data = {}
	list.forEach(item => {
		const group = item.componentConfig.group
		if (!data[group]) {
			data[group] = {
				title: COMPONENT_TYPE_NAME[group],
				data: [],
			}
		}
		data[group].data.push(item)
	})

	return data
}

const materiaGroup = ref<Array<any>>([])
async function initData() {
	const groupData = await handlePropsGroup()

	materiaGroup.value = groupData as Array<any>

	console.log('groupData =>', groupData)
}

initData()

function draggeEnd(e: any, data: any) {}
function draggeStart() {}

const getComponent = computed(() => (material: any) => {
	const componentType = material.componentConfig.componentType
	return componentsMap[componentType]
})

const getPropsComponent = computed(() => (prop: any) => {
	console.log('prop=>', prop)
	const componentType = prop.componentType
	return componentType ? componentsMap[componentType] : 't-input'
})

const getPropsValue = computed(() => (prop: any) => {
	const props = prop.props
	return props ? props : {}
})

function handlePullComponent(item: any) {
	console.log('pull=>', item)
}

console.log('materiaGroup =>', materiaGroup)

const cloneMaterialList = cloneDeep(getMaterialList())

console.log('cloneMaterialList =>', cloneMaterialList)

const widgetList = reactive([])
const activeComponent = ref({})

function handleClickComponent(item: any) {
	console.log('item==>', item)
	activeComponent.value = item
}

const activePropsList = computed(() => {
	const props = (activeComponent.value as any)?.props
	return toArray(props)
})

const widgetIds = computed(() => {
	return widgetList.map((item: any) => item.id)
})

watch(
	() => widgetIds.value,
	val => {
		nextTick(() => {
			const component = widgetList.find((item: any) => {
				return item.id === draggeId.value
			})
			console.log('component', component)
			if (component) {
				activeComponent.value = component
			}
		})
	},
	{
		deep: true,
	},
)
</script>
<style lang="scss" scoped>
// 简单展开收起过度效果
@mixin collapse-transition($property: all, $time: 0.2s, $timingFunction: ease) {
	transition: $property $time $timingFunction;
}
.header {
	margin-bottom: 12px;
	padding: 10px;
	position: absolute;
	width: 100%;
	padding-right: 33px;
	padding-left: 20px;
	box-sizing: border-box;
	background: #fff;
	text-align: center;
	top: 0;
	z-index: 2;
	font-weight: bold;
}
.code-container {
	width: 100%;
	height: 100%;
	display: flex;
	background-color: #f2f3f6;
	padding-top: 46px;
	.left {
		width: 280px;
		padding: 20px;
		margin-right: 8px;
		background-color: #fff;
		@include collapse-transition(width);
		overflow: hidden;
		&.collapse {
			width: 0px;
			padding: 0;
		}
		.material-group {
			padding-bottom: 12px;
			.group-title {
				font-weight: bold;
				margin-bottom: 20px;
			}
		}
	}
	.center {
		flex-grow: 1;
		margin-right: 8px;
		background-color: #fff;
		padding: 20px;
	}
	.right {
		width: 300px;
		padding: 20px;
		background-color: #fff;
	}
}

.materia-item {
	cursor: pointer;
}

.materia-item {
	margin-right: 12px;
	margin-bottom: 12px;
}

.component-list {
	min-height: 100%;
	width: 100%;
	.component-item {
		margin-bottom: 12px !important;
	}
}
.ghost {
	width: 100% !important;
	border: 2px solid #2ba471 !important;
}
</style>
