import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
	{
		path: '/',
		redirect: '/low-code',
	},
	{
		name: 'LowCode',
		path: '/low-code',
		component: () => import('../views/LowCode.vue'),
	},
]

const router = createRouter({
	scrollBehavior: () => ({ left: 0, top: 0 }),
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	next()
})

console.log('router=>', router)

export default router
