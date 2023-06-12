<template>
	<t-form :data="formData" @reset="onReset" @submit="onSubmit">
		<t-form-item label="姓名" name="name">
			<t-input v-model="formData.name" placeholder="请输入内容" @enter="onEnter"></t-input>
		</t-form-item>

		<t-form-item>
			<t-space size="small">
				<t-button theme="primary" type="submit">提交</t-button>
				<t-button theme="default" variant="base" type="reset">重置</t-button>
			</t-space>
		</t-form-item>
	</t-form>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import mitt from 'mitt'
const formData = ref({
	name: '',
})
const emitter = mitt()
const onReset = () => {
	MessagePlugin.success('重置成功')
}

const onSubmit = ({ validateResult, firstError }) => {
	if (validateResult === true) {
		const name = formData.value.name
		if (!name) {
			MessagePlugin.error('请输入姓名进行查询')
			return
		}
		emitter.emit('eventTrigger', {
			type: 'click',
			Eevent: {
				args: [name],
				TriggerType: 'doSearch',
			},
		})
		MessagePlugin.success('提交成功')
	} else {
		console.log('Validate Errors: ', firstError, validateResult)
		MessagePlugin.warning(firstError)
	}
}
</script>
<style lang="scss" scoped></style>
