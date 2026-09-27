import { createApp } from 'vue'
import '@/style.css'
import HubApp from './HubApp.vue'
import i18n from '@/i18n'

createApp(HubApp).use(i18n).mount('#app')
