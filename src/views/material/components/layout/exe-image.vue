<template>
	<t-image :style="imageStyle"></t-image>
</template>
<script setup lang="ts">
import { ref, reactive, useAttrs, computed } from 'vue'
import { pick } from 'lodash-es'

import EImage from '../../props/image'
import { transformAttrToPX } from '@/utils'

console.log('EImage=>', EImage)
const attrs = useAttrs()
console.log('attrs', attrs)

const styleAttrs = ['width', 'height']
const imageStyle = computed(() => {
	const styleObj = pick(attrs, styleAttrs)
	return transformAttrToPX(styleObj, styleAttrs)
})
</script>
<style lang="scss" scoped></style>
