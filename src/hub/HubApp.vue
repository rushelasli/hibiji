<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowDown, ArrowUpRight, ExternalLink } from '@lucide/vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LocaleToggle from '@/components/LocaleToggle.vue'
import { hubSites, PORTFOLIO_BASE, type HubSite } from '@/data/projects'

const { t, tm, locale } = useI18n()

const year = new Date().getFullYear()

const liveSites = computed(() => hubSites.filter((s) => s.status === 'live'))
const soonSites = computed(() => hubSites.filter((s) => s.status === 'soon'))

function siteTitle(site: HubSite) {
  return t(`hub.sites.${site.slug}.title`)
}

function siteDesc(site: HubSite) {
  return t(`hub.sites.${site.slug}.desc`)
}

function siteTags(site: HubSite): string[] {
  return tm(`hub.sites.${site.slug}.tags`) as unknown as string[]
}

function scrollToLive() {
  document.getElementById('live')?.scrollIntoView({ behavior: 'smooth' })
}

function syncDocumentMeta() {
  document.documentElement.lang = locale.value
  document.title = t('hub.metaTitle')
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

      <!-- Hero — flat, single-column: tagline → title → intro → stats → CTA -->
      <section id="hero" class="border-b border-foreground/10">
        <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
          <p class="mb-4 font-mono text-[13px] uppercase tracking-[0.2em] text-primary">
            {{ t('hub.eyebrow') }}
          </p>
          <h1
            class="mb-5 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl"
          >
            {{ t('hub.title') }}
          </h1>
          <p class="mb-4 max-w-lg text-[17px] leading-relaxed text-muted-foreground">
            {{ t('hub.intro') }}
          </p>
          <p class="mb-8 font-mono text-[13px] text-subtle-foreground">
            {{ t('hub.stats', { live: liveSites.length, soon: soonSites.length }) }}
          </p>
          <button
            class="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[#5a4bd1]"
            @click="scrollToLive"
          >
            <ArrowDown class="h-4 w-4" />
            {{ t('hub.ctaBrowse') }}
          </button>
        </div>
      </section>

      <!-- Live sites — 2-column card grid -->
      <section id="live" class="border-b border-foreground/10">
        <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
          <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-primary">
            {{ t('hub.liveEyebrow') }}
          </p>
          <h2 class="mb-10 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {{ t('hub.liveTitle') }}
          </h2>

          <div class="grid gap-5 md:grid-cols-2">
            <article
              v-for="(site, i) in liveSites"
              :key="site.slug"
              class="flex flex-col rounded-xl border border-foreground/10 bg-card p-6 transition-colors hover:border-foreground/20"
            >
              <div class="flex items-baseline gap-4">
                <span class="font-mono text-[13px] text-subtle-foreground">
                  {{ String(i + 1).padStart(2, '0') }}
                </span>
                <h3 class="text-xl font-semibold tracking-tight text-foreground">
                  {{ siteTitle(site) }}
                </h3>
              </div>

              <p class="mt-3 leading-relaxed text-muted-foreground">
                {{ siteDesc(site) }}
              </p>

              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="tag in siteTags(site)"
                  :key="tag"
                  class="rounded-full border border-foreground/10 px-3 py-1 font-mono text-xs text-muted-foreground"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Buttons sit on the same bottom line across every card -->
              <div class="mt-auto flex flex-wrap gap-2 border-t border-foreground/10 pt-5">
                <a
                  :href="`/${site.slug}`"
                  class="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[#5a4bd1]"
                >
                  {{ t('hub.seeDetail') }}
                  <ArrowUpRight class="h-4 w-4" />
                </a>
                <a
                  v-if="site.extra"
                  :href="site.extra.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex h-11 items-center gap-2 rounded-lg border border-foreground/15 px-5 text-sm font-medium text-foreground/90 transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  {{ site.extra.label }}
                  <ExternalLink class="h-4 w-4" />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Coming soon — one compact panel, not full cards -->
      <section id="soon" class="border-b border-foreground/10">
        <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
          <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-primary">
            {{ t('hub.soonEyebrow') }}
          </p>
          <h2 class="mb-10 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {{ t('hub.soonTitle') }}
          </h2>

          <div class="rounded-xl border border-foreground/10 bg-card">
            <div
              v-for="site in soonSites"
              :key="site.slug"
              class="flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 px-6 py-5 first:border-t-0"
            >
              <div class="min-w-0">
                <h3 class="text-base font-semibold text-foreground md:text-lg">
                  {{ siteTitle(site) }}
                </h3>
                <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {{ siteDesc(site) }}
                </p>
              </div>
              <span
                class="shrink-0 rounded-full border border-primary/40 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-primary"
              >
                {{ t('hub.comingSoon') }}
              </span>
            </div>
          </div>
        </div>
      </section>

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
