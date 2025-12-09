import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/main.css'

// Routes
const routes = [
	{ path: '/', component: () => import('./views/HomePage.vue') },
	{
		path: '/catalog/:category?',
		component: () => import('./views/CatalogPage.vue'),
	},
	{ path: '/product/:id', component: () => import('./views/ProductPage.vue') },
	{
		path: '/constructor',
		component: () => import('./views/ConstructorPage.vue'),
	},
	{ path: '/cart', component: () => import('./views/CartPage.vue') },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) return savedPosition
		return { top: 0, behavior: 'smooth' }
	},
})

const app = createApp(App)
app.use(router)
app.mount('#app')
