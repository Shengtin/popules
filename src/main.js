import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './main.css' // Tailwind v4

const app = createApp(App)
app.use(createPinia())
app.mount('#app')