import { createApp } from 'vue'
import '@/style.css'
import HubApp from './HubApp.vue'
import i18n from '@/i18n'

// The hub has no router: detail pages are plain static folders served at
// /<slug>/, so the current path selects the view (see HubApp's detailPages).
createApp(HubApp, { initialPath: window.location.pathname })
  .use(i18n)
  .mount('#app')
