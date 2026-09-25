<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowLeft } from '@lucide/vue'

const { t } = useI18n()

// The DSP web app stays on the live origin (691 KB app, not ported)
const dspHref = 'https://furuhibi.nyaahibi.web.id/dsp.html'
</script>

<template>
  <section class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
      <router-link
        to="/#projects"
        class="mb-8 inline-flex items-center gap-1.5 font-mono text-[13px] text-zinc-400 transition-colors hover:text-white"
      >
        <ArrowLeft class="h-3.5 w-3.5 text-[#6c5ce7]" />
        {{ t('furuhibi.back') }}
      </router-link>

      <div class="flex flex-col-reverse items-center gap-10 md:flex-row md:items-start md:gap-12">
        <div class="w-full flex-1">
          <p class="mb-4 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
            {{ t('furuhibi.headerEyebrow') }}
          </p>
          <p class="mb-3 font-mono text-[13px] text-zinc-500">
            {{ t('furuhibi.heroMark') }}
          </p>
          <h1
            class="mb-4 text-3xl font-semibold leading-[1.15] tracking-tight text-white md:text-4xl"
            v-html="t('furuhibi.heroTitle')"
          />
          <p class="max-w-lg text-[17px] leading-relaxed text-zinc-400">
            {{ t('furuhibi.heroSub') }}
          </p>

          <div class="mt-7 flex flex-wrap gap-3">
            <a
              href="#products"
              class="inline-flex items-center rounded-lg bg-[#6c5ce7] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#7d6ef0]"
            >
              {{ t('furuhibi.ctaPrimary') }}
            </a>
            <a
              :href="dspHref"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center rounded-lg border border-white/15 px-5 py-2.5 text-[14px] font-medium text-zinc-200 transition-colors hover:border-white/30 hover:text-white"
            >
              {{ t('furuhibi.ctaSecondary') }}
            </a>
          </div>
        </div>

        <div class="shrink-0 text-center">
          <img
            src="/projects/furuhibi/maskot.jpg"
            :alt="t('furuhibi.mascotAlt')"
            class="w-52 rounded-xl border border-white/10 md:w-60"
            loading="lazy"
          />
          <p class="mt-2 font-mono text-[13px] text-zinc-500">
            {{ t('furuhibi.mascotCaption') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
