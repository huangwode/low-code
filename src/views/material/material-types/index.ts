import { PropType } from 'vue'
export type SizeOptions = 'small' | 'medium' | 'large'
export type ThemeOptions = 'default' | 'primary' | 'danger' | 'warning' | 'success'
export type VariantOptions = 'base' | 'outline' | 'dashed' | 'text'
export type FitOptions = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
export type ShapeOptions = 'circle' | 'round' | 'square'

type TriggerType = 'alert' | 'windowOpen'
type EventType = 'click'
export interface Eevent {
	args: any[]
	triggerType: TriggerType
}
export interface Eaction {
	type: EventType
	args?: any[]
	to?: string
	from?: string
	events: Eevent[]
}
export enum COMPONENTTYPE {
	input = 'input',
	layout = 'layout',
	base = 'base',
}
export type EProps = Record<string, any>

export enum COMPONENT_TYPE_NAME {
	input = '输入组件',
	layout = '展示组件',
	base = '基础组件',
}
type ComponentType = keyof typeof COMPONENTTYPE
type ComponentNameType = keyof typeof COMPONENT_TYPE_NAME

// 组件配置
interface ComponentConfig {
	group: string // 分组名称
	componentName: string // 组件名称
	componentType: string // 组件类型
}
export interface EControl {
	componentConfig: ComponentConfig
	props?: EProps // 组件属性
	version?: string // 版本号
}
export interface ENode {
	readonly id: string
	name: string
	type: string
	props?: EProps
	children?: ENode[]
	style?: Record<string, string>
	class?: string[]
	actions?: Eaction
}
export interface EPage {
	readonly id: string
	title?: string
	nodes?: ENode[]
	class?: string[]
	style?: Record<string, string>
}

export type ControlGroupItem = {
	title: string
	data: EControl[]
}

export type ControlGroup = Record<ComponentType, ControlGroupItem>

export interface ExeImage {
	src?: string
	alt?: string
	fit?: FitOptions
	shape?: ShapeOptions
	id?: number | string
	width?: number
	height?: number
	componentType: COMPONENTTYPE.layout
}

export interface ExeInput {
	value?: string
	placeholder?: string
	align?: 'left' | 'center' | 'right'
	clearable?: boolean
}
export interface ExeIcon {
	name: string
	size?: string
	url?: Array<string> | string
	componentType: COMPONENTTYPE.layout
}
export interface ExeButton {
	block?: boolean
	content?: string
	disabled?: boolean
	ghost?: boolean
	size?: SizeOptions
	theme?: ThemeOptions
	variant?: VariantOptions
}

export interface ValidateErrorData {
	result: boolean
	message?: string
}
