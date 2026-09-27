<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Navbar from '@/components/Navbar.vue'
import FooterSection from '@/components/FooterSection.vue'

const route = useRoute()
const { t, locale } = useI18n()

const PROJECT_ROUTES = new Set(['amp', 'microamp', 'furuhibi'])

function syncDocumentMeta() {
  document.documentElement.lang = locale.value
  const name = String(route.name)
  document.title = t(PROJECT_ROUTES.has(name) ? `meta.${name}` : 'meta.home')
}

onMounted(syncDocumentMeta)
watch([locale, () => route.name], syncDocumentMeta)
</script>

<template>
  <div class="min-h-screen bg-background font-sans text-foreground/95 antialiased">
    <Navbar />
    <RouterView />
    <FooterSection />
  </div>
</template>