import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import './assets/style/reset.css'
// import './assets/style/index.scss'

import router from '@/router/index'
import { registerGlobalComponent } from './views/material'

const app = createApp(App)

app.use(TDesign)

app.use(router)

registerGlobalComponent(app)

app.mount('#app')
