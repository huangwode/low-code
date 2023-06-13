import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import './assets/style/reset.css'
// import './assets/style/index.scss'
import mitt from 'mitt'
// 将 mitt 挂载到 Vue 实例上

import router from '@/router/index'
import { registerGlobalComponent } from './views/material'

const app = createApp(App)

app.use(TDesign)

app.use(router)

registerGlobalComponent(app)

console.warn('app=>', app)
app.config.globalProperties.$bus = mitt()

app.mount('#app')
