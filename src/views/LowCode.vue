<!-- eslint-disable vue/valid-v-model -->
<template>
	<h1 class="header" :style="getPageStyle">
		<span>{{ pageConfig.title }}</span>
		<div class="tool">
			<t-space>
				<t-button @click="openPageConfig">页面设置</t-button>
				<t-button @click="handlePreview">预览</t-button>
				<t-button @click="savePage">保存</t-button>
			</t-space>
		</div>
	</h1>
	<div class="code-container">
		<div class="left" :class="{ collapse: stencilCollapseStatus }">
			<div class="group-container">
				<div v-for="(group, index) in materiaGroup" :key="index" class="material-group">
					<div class="group-title">{{ group.title }}</div>
					<draggable :list="group.data" :clone="cloneDraggeComponent" :force-fallback="true" :group="{ name: 'list', pull: 'clone', put: false }" :sort="false" item-key="id" animation="300">
						<template #item="{ element }">
							<t-tag class="materia-item">{{ element.componentConfig.componentName }}</t-tag>
						</template>
					</draggable>
				</div>
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
					<div class="component-item" :class="{ active: element.id === activeComponent?.id }">
						<component
							:is="getComponent(element)"
							v-bind="materialProps(element)"
							@change="changeValue($event, element)"
							@click="handleClickComponent(element)"
							@focus="handleClickComponent(element)"
						/>
					</div>
				</template>
			</draggable>
		</div>
		<div class="right">
			<t-tabs v-model="tabVal">
				<t-tab-panel :value="1" label="属性编辑"></t-tab-panel>
				<t-tab-panel :value="2" label="事件"></t-tab-panel>
			</t-tabs>

			<div v-if="tabVal === 1">
				<t-form :data="activePropsData">
					<t-form-item v-for="(item, key) in activePropsData" :key="key" :rules="getPropsRules(item)" :name="key + '.value'" :label="item.label">
						<component :is="getPropsComponent(item)" v-model="item.value" v-bind="getPropsValue(item)" />
					</t-form-item>
				</t-form>
			</div>

			<!-- 事件 -->
			<div v-if="tabVal === 2">
				<!-- <t-button @click="logData">test</t-button> -->
				<!-- 简单实现 alert 和 window.open -->
				<div v-if="activeActions">
					<t-button style="margin-top: 12px" @click="addEvent">增加事件</t-button>
					<t-form class="actions-list">
						<t-card v-for="(item, index) in activeActions.events" :key="index" class="action-item" bordered>
							<template #actions>
								<a href="javascript:void(0)" @click="delEvent(index)">删除</a>
							</template>
							<t-form-item label="触发类型">
								<t-select v-model="item.triggerType" :options="triggerOptions" />
							</t-form-item>

							<t-form-item :label="item.triggerType === 'alert' ? '消息内容' : '页面地址'">
								<t-input v-model="item.args[0]" />
							</t-form-item>
						</t-card>
					</t-form>
				</div>
			</div>
		</div>
	</div>

	<page-config v-model="pageConfigFlag" :data="pageConfig" />
</template>
<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { cloneDeep, toArray } from 'lodash-es'
import draggable from 'vuedraggable'
import { createEPage, createEnode, getMaterialList } from './material/index'
import ToggleIcon from '@/components/ToggleIcon.vue'
import PageConfig from '@/components/PageConfig.vue'
import { COMPONENT_TYPE_NAME, ControlGroup, EControl, Eevent, ENode, EPage, EProps } from './material/material-types'

import { componentsMap } from './material/enum'
import { MessagePlugin } from 'tdesign-vue-next'
import { useRouter } from 'vue-router'
const router = useRouter()

const tabVal = ref(1)

// 测试
function logData() {
	console.log('widgetList =>', widgetList)
	console.log('active com=>', activeComponent.value)
}

const triggerOptions = [
	{ label: '消息提示', value: 'alert' },
	{ label: '打开窗口', value: 'windowOpen' },
]
const defaultEventData: Eevent = {
	args: [],
	triggerType: 'alert',
}

function addEvent() {
	;(activeComponent.value as ENode).actions?.events.push(cloneDeep(defaultEventData))
}

function delEvent(index: number) {
	;(activeComponent.value as ENode).actions?.events.splice(index, 1)
}

const pageConfigFlag = ref(false)
function openPageConfig() {
	pageConfigFlag.value = true
}

// 预览
function handlePreview() {
	pageData.value = createEPage(widgetList, pageConfig)
	localStorage.setItem('lowCodePageData', JSON.stringify(pageData.value))

	const url = router.resolve({ name: 'Preview' })
	// router.push({ name: 'Preview' })
	console.log('url=>', url)
	window.open(url.href)
}
// 左侧收起状态
const stencilCollapseStatus = ref(false)
const materialProps = computed(() => (item: EProps) => {
	const props = item.props

	const keys = Object.keys(props)
	const propsData = {}
	keys.forEach(key => {
		propsData[key] = props[key]?.value
	})
	return propsData
})

const propList = ref<Array<EProps>>([])

const draggeId = ref('')

function cloneDraggeComponent(item: EControl) {
	const enode = createEnode(item)
	draggeId.value = enode.id
	return enode
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

const materiaGroup = ref<ControlGroup>()
async function initData() {
	const groupData = await handlePropsGroup()

	materiaGroup.value = groupData as ControlGroup
}

initData()

const getComponent = computed(() => (node: ENode) => {
	const componentType = node.type
	return componentsMap[componentType]
})

function changeValue(val: unknown, node: ENode) {
	const componentType = node.type
	// 简单实现输入框输入
	if (componentType === 'exe-input' && node.props) {
		node.props.value.value = val
	}
}

const getPropsComponent = computed(() => (prop: EProps) => {
	const componentType = prop.componentType
	return componentType ? componentsMap[componentType] : 't-input'
})

const getPropsValue = computed(() => (prop: EProps) => {
	const props = prop.props
	return props ? props : {}
})

const cloneMaterialList = cloneDeep(getMaterialList())

const widgetList = reactive([])
const activeComponent = ref<ENode>()

function handleClickComponent(item: ENode) {
	activeComponent.value = item
}

// 编辑属性数组
// const activePropsList = computed(() => {
// 	const props = (activeComponent.value as ENode)?.props
// 	return toArray(props)
// })

// 右侧编辑属性data
const activePropsData = computed(() => {
	const props = (activeComponent.value as ENode)?.props
	return props || {}
})

// 右侧事件编辑 暂时只支持点击事件
const activeActions = computed(() => {
	const actions = (activeComponent.value as ENode)?.actions
	return actions || null
})
// 获取编辑属性校验规则
const getPropsRules = computed(() => (prop: EProps) => {
	if (prop.validator) {
		return [
			{
				validator: (value: unknown) => {
					return prop.validator(value)
				},
			},
		]
	}
	return []
})
const widgetIds = computed(() => {
	return widgetList.map((item: ENode) => item.id)
})

const pageConfig = reactive<Omit<EPage, 'id' | 'nodes'>>({
	title: '低代码实战',
	style: { color: '#0052d9' },
})

const getPageStyle = computed(() => {
	return pageConfig.style || {}
})
const pageData = ref({})

function savePage() {
	const pageData = createEPage(widgetList, pageConfig)
	MessagePlugin.success('保存成功')
	console.log('页面数据=>', pageData)
}

watch(
	() => widgetIds.value.length,
	val => {
		nextTick(() => {
			const component = widgetList.find((item: ENode) => {
				return item.id === draggeId.value
			})
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
.css-scrollbar {
	overflow: auto;
	scrollbar-color: var(--td-scrollbar-color);
	scrollbar-width: thin;
	&.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
	&::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}
	&::-webkit-scrollbar-thumb {
		border: 0px solid transparent;
		background-clip: content-box;
		background-color: var(--td-scrollbar-color);
		border-radius: 11px;
	}
	&::-webkit-scrollbar-thumb:vertical:hover,
	&::-webkit-scrollbar-thumb:horizontal:hover {
		background-color: var(--td-scrollbar-hover-color);
	}
}
.header {
	margin-bottom: 12px;
	padding: 18px;
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
	display: flex;
	align-items: center;
	justify-content: center;
	.tool {
		position: absolute;
		right: 10px;
	}
}
.code-container {
	width: 100%;
	height: 100%;
	display: flex;
	background-color: #f2f3f6;
	padding-top: 60px;
	.left {
		width: 280px;
		margin-right: 8px;
		background-color: #fff;
		@include collapse-transition(width);
		overflow: hidden;
		&.collapse {
			width: 0px;
			padding: 0;
		}
		.group-container {
			padding: 20px;
			box-sizing: border-box;
			width: 280px;
			.material-group {
				padding-bottom: 12px;
				.group-title {
					font-weight: bold;
					margin-bottom: 20px;
				}
			}
		}
	}
	.center {
		flex-grow: 1;
		margin-right: 8px;
		background-color: #fff;
		padding: 20px;
		overflow: auto;
		@extend .css-scrollbar;
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
		box-sizing: border-box;
		&.active {
			border: 2px solid #618dff;
		}
	}
}
.ghost {
	width: 100% !important;
	height: 100%;
	box-sizing: border-box;
	// border: 2px solid #2ba471 !important;
	position: relative;
	flex: 0 0 100%;
	max-width: 100%;
	padding: 0;
	overflow: hidden;

	&::after {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		height: 5px;
		content: ' ';
		background: #618dff;
	}
}

.actions-list {
	margin-top: 12px;
	margin-bottom: 12px;

	.action-item {
		margin-bottom: 12px;
	}
}
</style>
