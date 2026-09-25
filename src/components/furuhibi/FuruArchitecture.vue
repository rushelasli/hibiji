<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        {{ t('furuhibi.archEyebrow') }}
      </p>
      <h2 class="mb-3 max-w-[22ch] text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {{ t('furuhibi.archTitle') }}
      </h2>
      <p class="mb-10 max-w-xl text-[16px] leading-relaxed text-zinc-400">
        {{ t('furuhibi.archDesc') }}
      </p>

      <figure class="overflow-hidden rounded-xl border border-white/10 bg-white p-4 md:p-6">
        <img
          src="/projects/furuhibi/audiopipeline.png"
          :alt="t('furuhibi.archAlt')"
          class="w-full"
          loading="lazy"
        />
      </figure>
    </div>
  </section>
</template>
