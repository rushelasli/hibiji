<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, ExternalLink } from '@lucide/vue'
import { hubSites, PORTFOLIO_BASE, type HubSite } from '@/data/projects'

const { t, locale } = useI18n()

/** All eight projects, in the curated order of the old dashboard. */
const cards = hubSites

const CHAT_HREF = 'https://www.facebook.com/share/1DikM81ymJ/'

/** The AMP card previews the logo instead of a GLB, as the old page did. */
const CARD_IMAGES: Record<string, string> = { nyaahibiamp: '/logo.png' }

function siteTitle(site: HubSite) {
  return t(`hub.sites.${site.slug}.title`)
}

function siteDesc(site: HubSite) {
  return t(`hub.sites.${site.slug}.desc`)
}

function visitHref(site: HubSite) {
  return site.status === 'live' ? `/${site.slug}` : '/dash/comingsoon.html'
}

const year = new Date().getFullYear()

// Server clock (WIB) — starts empty so SSR and hydration match, then
// ticks every second, like the footer of the old dashboard.
const clock = ref('')
let timer: ReturnType<typeof setInterval> | undefined

function tick() {
  const now = new Date()
  const time = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  }).format(now)
  const date = new Intl.DateTimeFormat(locale.value === 'id' ? 'id-ID' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }).format(now)
  clock.value = `© ${year} NyaaHibi Project — ${t('dash.footer.serverTime')} ${time} ${date}`
}

// Visit counter — the old page polled /stats on the homeserver; if no
// valid endpoint answers, the line simply stays hidden.
const visitStats = ref<{ total: number | string; today: number | string } | null>(null)

const statsLine = computed(() => {
  const s = visitStats.value
  if (!s) return ''
  return `${t('dash.footer.total')} : ${s.total} | ${t('dash.footer.today')} : ${s.today}`
})

onMounted(async () => {
  tick()
  timer = setInterval(tick, 1000)
  if (hubSites.some((s) => s.model)) {
    await import('@google/model-viewer')
  }
  try {
    const res = await fetch('/stats')
    const data = (await res.json()) as { total?: number; today?: number }
    if (typeof data?.total === 'number' && typeof data?.today === 'number') {
      visitStats.value = { total: data.total, today: data.today }
    }
  } catch {
    /* no stats endpoint — stay hidden */
  }
})

watch(locale, tick)
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <!-- Header — centered logo/title/tagline, as on the old dashboard -->
  <section class="border-b border-foreground/10 bg-card/40">
    <div class="mx-auto max-w-5xl px-5 py-12 text-center md:px-8">
      <img src="/logo.png" alt="" aria-hidden="true" class="mx-auto mb-4 h-16 w-16 object-contain" />
      <h1 class="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {{ t('dash.title') }}
      </h1>
      <p class="mt-3 font-mono text-[13px] text-muted-foreground">
        {{ t('dash.subtitle') }}
      </p>
      <a
        href="/"
        class="mt-5 inline-flex w-fit items-center gap-1.5 font-mono text-[13px] text-primary underline underline-offset-4 transition-colors hover:text-foreground"
      >
        <ArrowLeft class="h-3.5 w-3.5" />
        {{ t('hub.ctaBrowse') }}
      </a>
    </div>
  </section>

  <!-- Project cards — one per site, GLB preview where the old page had one -->
  <section class="border-b border-foreground/10">
    <div class="mx-auto max-w-5xl px-5 py-12 md:px-8">
      <div class="grid gap-5 md:grid-cols-2">
        <article
          v-for="site in cards"
          :key="site.slug"
          class="flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-card transition-colors hover:border-foreground/20"
        >
          <model-viewer
            v-if="site.model"
            :src="site.model"
            class="block w-full"
            style="height: 240px"
            camera-controls
            exposure="0.8"
            shadow-intensity="1"
            environment-image="neutral"
          />
          <img
            v-else-if="CARD_IMAGES[site.slug]"
            :src="CARD_IMAGES[site.slug]"
            :alt="siteTitle(site)"
            class="h-60 w-full bg-muted object-contain p-10"
          />
          <div
            v-else
            class="h-60 w-full bg-muted/40"
            role="img"
            :aria-label="siteTitle(site)"
          />

          <div class="flex flex-1 flex-col p-5">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">
              {{ siteTitle(site) }}
            </h2>
            <p class="mt-2 leading-relaxed text-muted-foreground">
              {{ siteDesc(site) }}
            </p>

            <!-- Buttons pinned to the card bottom, across every card -->
            <div class="mt-auto flex flex-wrap gap-2 pt-5">
              <a
                :href="visitHref(site)"
                class="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-[#5a4bd1]"
              >
                {{ t('dash.visit') }}
              </a>
              <a
                v-if="site.extra"
                :href="site.extra.href"
                class="inline-flex items-center gap-1.5 rounded-lg border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground/90 transition-colors hover:border-foreground/30 hover:bg-foreground/5"
              >
                {{ t('dash.visitDsp') }}
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Profile — the creator card from the old dashboard -->
  <section class="border-b border-foreground/10">
    <div class="mx-auto max-w-5xl px-5 py-12 md:px-8">
      <div class="rounded-xl border border-foreground/10 bg-card p-6">
        <h2 class="mb-4 text-xl font-semibold tracking-tight text-foreground">
          {{ t('dash.profileTitle') }}
        </h2>
        <div class="grid gap-6 md:grid-cols-[220px_1fr]">
          <img
            src="/dash/gwe.png"
            :alt="t('dash.profileTitle')"
            class="aspect-square w-full max-w-[220px] rounded-xl object-cover"
          />
          <div>
            <p class="leading-relaxed text-muted-foreground">
              {{ t('dash.profileBio1') }}
            </p>
            <p class="mt-3 leading-relaxed text-muted-foreground" v-html="t('dash.profileBio2')" />
            <div class="mt-5 flex flex-wrap gap-2">
              <a
                :href="`${PORTFOLIO_BASE}/#about`"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-[#5a4bd1]"
              >
                {{ t('dash.aboutBtn') }}
              </a>
              <a
                :href="CHAT_HREF"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 rounded-lg border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground/90 transition-colors hover:border-foreground/30 hover:bg-foreground/5"
              >
                <ExternalLink class="h-4 w-4 text-primary" />
                {{ t('dash.chatBtn') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer band from the old dashboard: live WIB clock + best-effort visit stats -->
  <section>
    <div
      class="mx-auto max-w-5xl px-5 py-8 text-center font-mono text-xs text-subtle-foreground md:px-8"
    >
      <p>{{ clock }}</p>
      <p v-if="statsLine" class="mt-1">{{ statsLine }}</p>
    </div>
  </section>
</template>
