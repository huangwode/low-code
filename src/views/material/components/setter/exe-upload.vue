<template>
	<t-upload
		ref="uploadRef1"
		v-model="uploadImg"
		action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
		:disabled="false"
		auto-upload
		theme="image"
		tips="请选择单张图片文件上传"
		accept="image/*"
		@fail="handleFail"
		@success="handleSuccess"
	></t-upload>
</template>
<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
	inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import type { SuccessContext } from 'tdesign-vue-next'

interface props {
	modelValue: string
}
const emits = defineEmits(['update:modelValue'])
const props = defineProps<props>()

const uploadImg = computed({
	get() {
		if (props.modelValue) {
			return [
				{
					url: props.modelValue,
				},
			]
		} else {
			return []
		}
	},
	set(val) {
		console.log('set imag val', val)
		const urls = val.map(item => item.url)
		if (urls.length > 0) {
			emits('update:modelValue', urls[0])
		} else {
			emits('update:modelValue', '')
		}
	},
})
// const uploadImg = ref([])
function handleFail(value: any) {
	const file = value.file
	MessagePlugin.error(`文件 ${file.name} 上传失败`)
}

function handleSuccess(context: SuccessContext) {
	console.log('context=>', context)
	const url = context.response.url
	emits('update:modelValue', url)
}
</script>
<style lang="scss" scoped></style>
