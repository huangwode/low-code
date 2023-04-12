<script setup lang="ts"></script>

<template>
  <RouterView />
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
// @mixin collapse-transition($property: all, $time: 0.2s, $timingFunction: ease) {
//   transition: $property $time $timingFunction;
// }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.version-bar {
  position: fixed;
  z-index: 9999999;
  right: 0;
  bottom: 0;
  font-size: 12px;
  color: #999;
  padding: 8px;
  pointer-events: none;
}
</style>
