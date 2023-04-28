import { cloneDeep } from 'lodash-es'

/**
 * 借用浏览器的功能，返回不重复的 uuid 。
 *
 * @export
 * @returns
 */
export function uuid() {
	var temp_url = URL.createObjectURL(new Blob())
	var uuid = temp_url.toString()
	URL.revokeObjectURL(temp_url)
	return uuid.substr(uuid.lastIndexOf('/') + 1)
}

// 将属性转换为PX
export function transformAttrToPX(styleObj: any, attrs: string[]) {
	const cloneData = cloneDeep(styleObj)
	attrs.forEach(key => {
		cloneData[key] = cloneData[key] + 'px'
	})
	return cloneData
}
