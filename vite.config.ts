import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: '0.0.0.0',
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: resolve(__dirname, 'src'),
			},
		],
	},
	plugins: [vue(), WindiCSS()],
	css: {
		preprocessorOptions: {
			// scss:{
			//   additionalData: '@import "./assets/style/index.scss";'
			// }
		},
	},
})
