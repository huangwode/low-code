<template>
  <h1 class="header">低代码</h1>
  <div class="code-container">
    <div class="left" :class="{ collapse: stencilCollapseStatus }">
      <draggable
        :list="cloneMaterialList"
        ghost-class="ghost"
        :force-fallback="true"
        :group="{ name: 'list', pull: 'clone', put: false }"
        :sort="false"
        itemKey="id"
      >
        <template #item="{ element }">
          <t-tag class="materia-item">{{ element.name }}</t-tag>
        </template>
      </draggable>

      <toggle-icon v-model="stencilCollapseStatus" />
    </div>
    <div class="center">
      <draggable
        :list="widgetList"
        ghost-class="ghost"
        class="component-list"
        itemKey="id"
        :force-fallback="true"
        :group="{ pull: true, name: 'list' }"
        :fallback-class="true"
        :fallback-on-body="true"
      >
        <template #item="{ element }">
          <div class="component-item">
            <component
              :is="element.component"
              v-bind="materialProps(element)"
              @click="handleClickComponent(element)"
              @focus="handleClickComponent(element)"
            />
          </div>
        </template>
      </draggable>
    </div>
    <div class="right">
      <div class="">
        <t-form>
          <t-form-item
            v-for="(item, index) in activePropsList"
            :key="index"
            :label="item.label"
          >
            <t-input v-model="item.value"></t-input>
          </t-form-item>
        </t-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { cloneDeep, toArray } from 'lodash-es'
import draggable from 'vuedraggable'
import { materialList } from './material/index'
import ToggleIcon from '@/components/ToggleIcon.vue'
// 左侧收起状态
const stencilCollapseStatus = ref(false)
const materialProps = computed(() => (item: any) => {
  const props = item.props
  const keys = Object.keys(props)
  const propsData = {}
  keys.forEach(key => {
    propsData[key] = props[key]?.value
  })

  console.log('propsData==>', propsData)
  return propsData
})
const cloneMaterialList = cloneDeep(materialList)

const widgetList = reactive([])
const activeComponent = ref({})

function handleClickComponent(item: any) {
  console.log('item==>', item)
  activeComponent.value = item
}

const activePropsList = computed(() => {
  const props = activeComponent.value?.props
  return toArray(props)
})
</script>
<style lang="scss" scoped>
// 简单展开收起过度效果
@mixin collapse-transition($property: all, $time: 0.2s, $timingFunction: ease) {
  transition: $property $time $timingFunction;
}
.header {
  margin-bottom: 12px;
  padding: 10px;
  position: absolute;
  width: 100%;
  padding-right: 33px;
  padding-left: 20px;
  box-sizing: border-box;
  background: #fff;
  text-align: center;
  top: 0;
  z-index: 2;
  font-weight: bold;
}
.code-container {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f2f3f6;
  padding-top: 46px;
  .left {
    width: 280px;
    padding: 20px;
    margin-right: 8px;
    background-color: #fff;
    @include collapse-transition(width);
    overflow: hidden;
    &.collapse {
      width: 0px;
      padding: 0;
    }
  }
  .center {
    flex-grow: 1;
    margin-right: 8px;
    background-color: #fff;
    padding: 20px;
  }
  .right {
    width: 300px;
    padding: 20px;
    background-color: #fff;
  }
}

.materia-item {
  cursor: pointer;
}

.materia-item {
  margin-right: 12px;
  margin-bottom: 12px;
}

.component-list {
  min-height: 100%;
  width: 100%;
  .component-item {
    margin-bottom: 12px !important;
  }
}
.ghost {
  width: 100% !important;
  border: 2px solid #2ba471 !important;
}
</style>
