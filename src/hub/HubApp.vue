<script setup lang="ts">
import { computed, onMounted, watch, type Component } from 'vue'
import { useI18n } from 'vue-i18n'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LocaleToggle from '@/components/LocaleToggle.vue'
import HubLanding from '@/hub/HubLanding.vue'
import { hubSites, PORTFOLIO_BASE, type HubSite } from '@/data/projects'
import AmpProject from '@/pages/AmpProject.vue'
import AmpGen1Project from '@/pages/AmpGen1Project.vue'
import MicroampProject from '@/pages/MicroampProject.vue'
import TubeSeProject from '@/pages/TubeSeProject.vue'
import FuruhibiProject from '@/pages/FuruhibiProject.vue'

const props = defineProps<{
  /** window.location.pathname — the hub has no router, so the entry
   *  passes the URL directly; "/" (or anything unknown) renders the landing. */
  initialPath?: string
}>()

const { t, locale } = useI18n()

const year = new Date().getFullYear()

const liveSites = computed(() => hubSites.filter((s) => s.status === 'live'))

/** Detail page per live slug — content pages reuse the portfolio sections. */
const detailPages: Record<string, Component> = {
  nyaahibiamp: AmpGen1Project,
  nyaahibiv2: AmpProject,
  microhibiamp: MicroampProject,
  tubeseamp: TubeSeProject,
  furuhibi: FuruhibiProject,
}

const detailPath = computed(() => {
  const raw = props.initialPath ?? '/'
  const cleaned = raw.replace(/\/index\.html$/, '').replace(/\/+$/, '')
  return cleaned === '' ? '/' : cleaned
})

const detailSite = computed<HubSite | undefined>(() =>
  liveSites.value.find((s) => detailPath.value === `/${s.slug}`),
)

const detailComponent = computed<Component | null>(() => {
  const site = detailSite.value
  if (!site) return null
  return detailPages[site.slug] ?? null
})

function syncDocumentMeta() {
  document.documentElement.lang = locale.value
  const site = detailSite.value
  document.title = site ? `${t(`hub.sites.${site.slug}.title`)} — ${t('hub.title')}` : t('hub.metaTitle')
}

onMounted(syncDocumentMeta)
watch(locale, syncDocumentMeta)
</script>

<template>
  <div class="min-h-screen bg-background font-sans text-foreground/95 antialiased">
    <!-- Mascots stay pinned to the sides while scrolling; both face inward -->
    <img
      src="/maskotkiri.png"
      alt=""
      aria-hidden="true"
      class="pointer-events-none fixed bottom-0 left-0 z-0 hidden max-h-[70vh] max-w-[16vw] w-auto -scale-x-100 select-none object-contain object-bottom xl:block"
    />
    <img
      src="/maskotkanan.png"
      alt=""
      aria-hidden="true"
      class="pointer-events-none fixed bottom-0 right-0 z-0 hidden max-h-[70vh] max-w-[16vw] w-auto select-none object-contain object-bottom xl:block"
    />

    <div class="relative z-10 flex min-h-screen flex-col">
      <header class="sticky top-0 z-50 border-b border-foreground/10 bg-background/90 backdrop-blur">
        <nav class="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 md:px-8">
          <a
            :href="PORTFOLIO_BASE"
            class="flex items-center gap-2 font-mono text-lg font-bold tracking-wider text-foreground"
          >
            <img src="/logo.png" alt="" class="h-7 w-7 object-contain" aria-hidden="true" />
            NYAAHIBI<span class="text-primary">.</span>
          </a>
          <div class="flex items-center gap-0.5 border-l border-foreground/10 pl-3">
            <ThemeToggle />
            <LocaleToggle />
          </div>
        </nav>
      </header>

      <!-- Detail page — one of the five live project sites (back goes to
           the hub landing); anything else renders the landing itself -->
      <component v-if="detailComponent" :is="detailComponent" :key="detailPath" back-href="/" />
      <HubLanding v-else />

      <footer>
        <div
          class="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 px-5 py-8 text-sm text-subtle-foreground sm:flex-row sm:items-center md:px-8"
        >
          <a :href="PORTFOLIO_BASE" class="transition-colors hover:text-foreground">
            {{ t('hub.backToMain') }}
          </a>
          <span class="font-mono text-xs">© {{ year }} Ulil Albab · {{ t('footer.tagline') }}</span>
        </div>
      </footer>
    </div>
  </div>
</template>
