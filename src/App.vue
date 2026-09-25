<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Navbar from '@/components/Navbar.vue'
import FooterSection from '@/components/FooterSection.vue'

const route = useRoute()
const { t, locale } = useI18n()

function syncDocumentMeta() {
  document.documentElement.lang = locale.value
  document.title = route.name === 'amp' ? t('meta.amp') : t('meta.home')
}

onMounted(syncDocumentMeta)
watch([locale, () => route.name], syncDocumentMeta)
</script>

<template>
  <div class="min-h-screen bg-[#09090f] font-sans text-zinc-100 antialiased">
    <Navbar />
    <RouterView />
    <FooterSection />
  </div>
</template>