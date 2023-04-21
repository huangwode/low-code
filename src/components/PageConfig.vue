<template>
	<t-dialog v-model:visible="visible" :footer="null" header="页面设置">
		<t-form :data="data">
			<t-form-item label="页面标题" name="title">
				<t-input v-model="data.title" />
			</t-form-item>
			<t-form-item label="字体颜色" name="style.color">
				<t-color-picker v-model="data.style!.color" :show-primary-color-preview="false" />
			</t-form-item>
		</t-form>
	</t-dialog>
</template>
<script setup lang="ts">
import { EPage } from '@/views/material/material-types'
import { ref, computed, toRefs } from 'vue'
interface props {
	modelValue: boolean
	data: Omit<EPage, 'id' | 'nodes'>
}
const props = defineProps<props>()

const { data } = toRefs(props)

const emits = defineEmits(['update:modelValue'])

const visible = computed({
	get() {
		return props.modelValue
	},
	set(val) {
		emits('update:modelValue', val)
	},
})
</script>
<style lang="scss" scoped></style>
