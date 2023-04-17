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
		// 	default: '',
		// },
		src: {
			type: 'string',
			default: 'https://tdesign.gtimg.com/demo/demo-image-2.png',
			label: '图片路径',
			value: null,
		},
		// fit: {
		// 	type: String as PropType<ExeImage['fit']>,
		// 	default: 'fill' as ExeImage['fit'],
		// 	validator(val: ExeImage['fit']): boolean {
		// 		if (!val) return true
		// 		return ['contain', 'cover', 'fill', 'none', 'scale-down'].includes(val)
		// 	},
		// },
		/** 图片圆角类型 */
		shape: {
			label: '圆角',
			type: String as PropType<ExeImage['shape']>,
			default: 'square' as ExeImage['shape'],
			validator(val: ExeImage['shape']): boolean {
				if (!val) return true
				return ['circle', 'round', 'square'].includes(val)
			},
		},
	},
}
