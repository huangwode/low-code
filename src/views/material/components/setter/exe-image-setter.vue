<template>
	<div>
		<div>
			<t-input v-model="src" />
		</div>
		<div style="margin: 20px">
			<exe-upload v-model="src" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
interface props {
	modelValue: string
}
const emits = defineEmits(['update:modelValue'])
const props = defineProps<props>()
const src = computed({
	get() {
		return props.modelValue
	},
	set(val) {
		emits('update:modelValue', val)
	},
})
</script>
<style lang="scss" scoped></style>
