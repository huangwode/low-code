import { ExeImage, COMPONENTTYPE, ValidateErrorData } from '../material-types'
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
			type: String,
			componentType: 'exe-image-setter',
			value: 'https://tdesign.gtimg.com/demo/demo-image-2.png',
			label: '图片路径',
			validator(src: string): ValidateErrorData {
				if (!src) {
					return {
						result: false,
						message: '请输入图片地址',
					}
				}
				const reg = /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,}(?:\/[^\/#?]+)*[\/#?]?[^#]*$/i

				const result = reg.test(src)
				console.log('图片地址=>', src)
				return {
					result,
					message: result ? '' : '请输入正确的图片地址',
				}
			},
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
			// validator(val: ExeImage['shape']): boolean {
			// 	if (!val) return true
			// 	return ['circle', 'round', 'square'].includes(val)
			// },
			props: {
				options: [
					{ label: 'circle', value: 'circle' },
					{ label: 'round', value: 'round' },
					{ label: 'square', value: 'square' },
				],
			},
		},

		width: {
			label: '宽度',
			value: 200,
			componentType: 'exe-number',
			type: Number,
			props: {
				placeholder: '宽度',
				step: 10,
				min: 1,
			},
		},
		height: {
			label: '高度',
			value: 200,
			componentType: 'exe-number',
			type: Number,
			props: {
				placeholder: '高度',
				step: 10,
				min: 1,
			},
		},
	},
}
