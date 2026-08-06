import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '@/styles/_resets.scss'
import '@/styles/main.scss'

createApp(App)
    .use(router)
    .use(Toast, {
        position: 'top-right',
        timeout: 4000,
    })
    .mount('#app')
