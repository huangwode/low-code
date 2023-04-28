<template>
	<t-select v-model="iconValue" placeholder="请选择" :style="{ width: '100%' }" :popup-props="{ overlayInnerStyle: { width: '200px' } }">
		<t-option v-for="item in options" :key="item.stem" :value="item.stem" class="overlay-options">
			<div>
				<t-icon :name="item.stem" />
			</div>
		</t-option>
		<template #valueDisplay>
			<t-icon :name="iconValue" :style="{ marginRight: '8px' }" />
			{{ iconValue }}
		</template>
	</t-select>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'ExeIconSelect',
})
</script>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { manifest } from 'tdesign-icons-vue-next/lib/manifest'

// 获取全部图标的列表
const options = ref(manifest)
interface props {
	modelValue: string
}

const props = withDefaults(defineProps<props>(), {
	modelValue: 'add',
})
const emit = defineEmits(['update:modelValue'])
const iconValue = computed({
	get() {
		return props.modelValue
	},
	set(val) {
		emit('update:modelValue', val)
	},
})
</script>
<style>
.overlay-options {
	display: inline-block;
	font-size: 20px;
}
</style>
