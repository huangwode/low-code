import { ExeImage, COMPONENTTYPE } from '../material-types'
import { PropType } from 'vue'

export default {
	/** 图片描述 */
	componentConfig: {
		group: COMPONENTTYPE.layout,
		componentName: '图片',
		componentType: 'exe-image',
	},
	props: {
		// alt: {
		// 	type: 'string',
		// 	value: '',
		// },
		src: {
			type: 'string',
			value: 'https://tdesign.gtimg.com/demo/demo-image-2.png',
			label: '图片路径',
		},
		// fit: {
		// 	type: String as PropType<ExeImage['fit']>,
		// 	value: 'fill' as ExeImage['fit'],
		// 	validator(val: ExeImage['fit']): boolean {
		// 		if (!val) return true
		// 		return ['contain', 'cover', 'fill', 'none', 'scale-down'].includes(val)
		// 	},
		// },
		/** 图片圆角类型 */
		shape: {
			label: '圆角',
			type: String as PropType<ExeImage['shape']>,
			value: 'square' as ExeImage['shape'],
			componentType: 'exe-select',
			validator(val: ExeImage['shape']): boolean {
				if (!val) return true
				return ['circle', 'round', 'square'].includes(val)
			},
			props: {
				options: [
					{ label: 'circle', value: 'circle' },
					{ label: 'round', value: 'round' },
					{ label: 'square', value: 'square' },
				],
			},
		},
	},
}
