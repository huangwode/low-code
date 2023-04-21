import { EControl, ENode, EPage, EProps } from './material-types'
import { cloneDeep, omit } from 'lodash-es'
import { uuid } from '@/utils'

export async function getMaterialList() {
	const materialList: Array<EControl> = []

	const materialProps = import.meta.glob('./props/*.ts')
	console.log('materialProps', materialProps)

	for (const key in materialProps) {
		await materialProps[key]().then((mod: any) => {
			materialList.push(mod.default)
		})
	}

	// console.log('materialList ==>', materialList)
	return materialList
}

export async function registerGlobalComponent(app: any) {
	const materialComponents = import.meta.glob('./components/*.vue')
	for (const key in materialComponents) {
		await materialComponents[key]().then((mod: any) => {
			const fileName = key.match(/[^/]+\.vue$/)![0]
			const componentName = fileName.replace(/\.vue$/, '')
			app.component(componentName, mod.default)
		})
	}
}

// 根据物料创建node组件
export function createEnode(material: EControl): ENode {
	const cloneData = cloneDeep(material)
	const { componentConfig } = cloneData
	const { componentName: name, componentType: type } = componentConfig
	const id = uuid()

	return {
		id,
		name,
		type,
		...omit(cloneData, ['componentConfig']),
	}
}

// 创建page数据
export function createEPage(nodes: ENode[], props: Omit<EPage, 'id' | 'nodes'>): EPage {
	const id = uuid()
	const page = {
		id,
		nodes,
		...props,
	}
	return page
}
