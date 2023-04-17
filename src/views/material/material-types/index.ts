export type SizeOptions = 'small' | 'medium' | 'large'
export type ThemeOptions = 'default' | 'primary' | 'danger' | 'warning' | 'success'
export type VariantOptions = 'base' | 'outline' | 'dashed' | 'text'
export type FitOptions = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
export type ShapeOptions = 'circle' | 'round' | 'square'

export enum COMPONENTTYPE {
	input = 'input',
	layout = 'layout',
	base = 'base',
}

export enum COMPONENT_TYPE_NAME {
	input = '输入组件',
	layout = '展示组件',
	base = '基础组件',
}
export interface ExeImage {
	src?: string
	alt?: string
	fit?: FitOptions
	shape: ShapeOptions
	id?: number | string
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
