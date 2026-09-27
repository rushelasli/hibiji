<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowDown, ArrowRight, ArrowUpRight } from '@lucide/vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LocaleToggle from '@/components/LocaleToggle.vue'
import { hubSites, PORTFOLIO_BASE, PROJECTS_BASE, type HubSite } from '@/data/projects'

const { t, locale } = useI18n()

const year = new Date().getFullYear()

// Host-only forms for the portfolio-style address labels under each title
const siteHost = PROJECTS_BASE.replace(/^https:\/\//, '')
const portfolioHost = PORTFOLIO_BASE.replace(/^https:\/\//, '')

function siteTitle(site: HubSite) {
  return t(`hub.sites.${site.slug}.title`)
}

function siteDesc(site: HubSite) {
  return t(`hub.sites.${site.slug}.desc`)
}

function detailHref(site: HubSite) {
  return site.detail ? `${PORTFOLIO_BASE}${site.detail}` : ''
}

function scrollToProjects() {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
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
    <!-- Mascots stay pinned to the sides while scrolling; the left one is
         flipped to face the content -->
    <img
      src="/maskotkiri.png"
      alt=""
      aria-hidden="true"
      class="pointer-events-none fixed bottom-0 left-0 z-0 hidden max-h-[70vh] max-w-[16vw] w-auto scale-x-[-1] select-none object-contain object-bottom xl:block"
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

      <!-- Hero — same anatomy as the portfolio hero -->
      <section id="home" class="border-b border-foreground/10">
        <div
          class="mx-auto flex max-w-5xl flex-col-reverse items-start gap-10 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8 md:py-24"
        >
          <div class="max-w-xl">
            <p class="mb-4 font-mono text-[13px] uppercase tracking-[0.2em] text-primary">
              {{ t('hub.eyebrow') }}
            </p>
            <h1
              class="mb-5 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl"
            >
              {{ t('hub.title') }}
            </h1>
            <p class="mb-8 max-w-lg text-[17px] leading-relaxed text-muted-foreground">
              {{ t('hub.intro') }}
            </p>
            <button
              class="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[#5a4bd1]"
              @click="scrollToProjects"
            >
              <ArrowDown class="h-4 w-4" />
              {{ t('hub.cta') }}
            </button>
          </div>

          <!-- Brand mark in the portfolio's gradient ring -->
          <div class="shrink-0">
            <div
              class="rounded-full bg-linear-to-br from-[#6c5ce7] to-[#a29bfe] p-2.5 shadow-[0_0_40px_rgba(108,92,231,0.4)] md:p-3"
            >
              <img
                src="/logo.png"
                alt="NyaaHibi"
                class="h-44 w-44 rounded-full bg-background object-cover md:h-72 md:w-72"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Projects — bordered section, 2-up grid -->
      <section id="projects" class="scroll-mt-16 border-b border-foreground/10">
        <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
          <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-primary">
            {{ t('hub.projectsEyebrow') }}
          </p>
          <h2 class="mb-12 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {{ t('hub.projectsTitle') }}
          </h2>

          <div class="grid gap-5 md:grid-cols-2">
            <article
              v-for="(site, i) in hubSites"
              :key="site.slug"
              class="flex flex-col rounded-xl border border-foreground/10 bg-card p-6 transition-colors hover:border-foreground/20"
            >
              <div class="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span class="font-mono text-[13px] text-subtle-foreground">
                  {{ String(i + 1).padStart(2, '0') }}
                </span>
                <h3 class="text-xl font-semibold tracking-tight text-foreground">
                  {{ siteTitle(site) }}
                </h3>
                <span
                  v-if="site.status === 'soon'"
                  class="rounded-full border border-primary/40 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-primary"
                >
                  {{ t('hub.comingSoon') }}
                </span>
              </div>

              <p class="mt-3 leading-relaxed text-muted-foreground">
                {{ siteDesc(site) }}
              </p>

              <!-- Portfolio-style arrow links: addresses as labels -->
              <div
                v-if="site.status === 'live' || site.detail || site.extra"
                class="mt-4 flex flex-col gap-2"
              >
                <a
                  v-if="site.status === 'live'"
                  :href="`/${site.slug}`"
                  class="group inline-flex w-fit items-center gap-1.5 font-mono text-[13px] text-foreground/80 transition-colors hover:text-foreground"
                >
                  <ArrowRight
                    class="h-3.5 w-3.5 text-primary transition-transform group-hover:translate-x-0.5"
                  />
                  {{ siteHost }}/{{ site.slug }}
                </a>
                <a
                  v-if="site.extra"
                  :href="site.extra.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group inline-flex w-fit items-center gap-1.5 font-mono text-[13px] text-foreground/80 transition-colors hover:text-foreground"
                >
                  <ArrowUpRight
                    class="h-3.5 w-3.5 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  {{ site.extra.label }}
                </a>
                <a
                  v-if="site.detail"
                  :href="detailHref(site)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group inline-flex w-fit items-center gap-1.5 font-mono text-[13px] text-foreground/80 transition-colors hover:text-foreground"
                >
                  <ArrowUpRight
                    class="h-3.5 w-3.5 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  {{ t('hub.details') }} — {{ portfolioHost }}{{ site.detail }}
                </a>
              </div>

              <!-- Tag chips pinned to the card bottom -->
              <div class="mt-auto flex flex-wrap gap-2 border-t border-foreground/10 pt-5">
                <span
                  v-for="tag in site.tags"
                  :key="tag"
                  class="rounded-full border border-foreground/10 px-3 py-1 font-mono text-xs text-muted-foreground"
                >
                  {{ tag }}
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <footer class="border-t border-foreground/10">
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
