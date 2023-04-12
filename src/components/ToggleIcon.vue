<template>
  <div>
    <button
      class="sidebar-toggle"
      :class="{ open: !modelValue }"
      @click="toggleStatus"
    >
      <div class="sidebar-toggle-button">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'ToggleIcon',
  props: {
    modelValue: {
      type: Boolean,
      defaul: false,
    },
  },
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const { modelValue } = toRefs(props)

    function toggleStatus() {
      context.emit('update:modelValue', !modelValue.value)
    }

    return {
      toggleStatus,
    }
  },
})
</script>

<style lang="scss" scoped>
.toggle-icon {
  position: absolute;
  top: 3%;
  right: 0;
  font-size: 25px;
  transform: translate(88%, -50%);
  color: rgb(144, 147, 153);
  z-index: 2;
  cursor: pointer;
}

.button-container {
  width: 36px;
  height: 36px;
  background-color: #1890ff;
  color: #ffffff;
  font-size: 18px;
  position: fixed;
  box-shadow: 0 2px 12px rgb(0 0 0 / 6%), 0 2px 4px rgb(0 0 0 / 8%);
  left: 16px;
  bottom: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: var(--td-brand-color-active);
  z-index: 2;
}

$main-color: var(--td-brand-color-active);

.sidebar-toggle {
  background-color: transparent;
  background-color: hsla(0, 0%, 100%, 0.8);
  border: 0;
  outline: none;
  padding: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  transition: opacity 0.3s;
  width: 50px;
  z-index: 30;
  cursor: pointer;
  &:hover .sidebar-toggle-button {
    opacity: 0.4;
  }

  &::before {
    content: '';
    position: fixed;
    background: #fff;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    box-shadow: 0 0 4px 1px #ddd;
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
    z-index: -1;
    cursor: pointer;
    transition: 0.5s all;
  }
  span {
    background-color: $main-color;
    display: block;
    margin-bottom: 4px;
    width: 16px;
    height: 2px;
  }

  .sidebar-toggle-button span {
    transition: 0.5s all;
    opacity: 1;
    transform: translate(0, 0) rotate(0);
  }

  // 开启
  &.open {
    &::before {
      // background: #ccc
      //   linear-gradient(90deg, hsla(0, 0%, 100%, 0.6), hsla(0, 0%, 100%, 0));
      background: #ccc
        linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.3)
        );
    }
    .sidebar-toggle-button {
      span {
        &:nth-child(1) {
          transform: translate(0px, 9px) rotate(45deg);
          background-color: #fff;
        }
        &:nth-child(2) {
          background-color: #fff;
          opacity: 0;
        }
        &:nth-child(3) {
          transform: translate(0px, -3px) rotate(-45deg);
          background-color: #fff;
        }
      }
    }
  }
}
</style>
