<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowLeft } from '@lucide/vue'

const { t } = useI18n()
</script>

<template>
  <section class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
      <router-link
        to="/#projects"
        class="mb-8 inline-flex items-center gap-1.5 font-mono text-[13px] text-zinc-400 transition-colors hover:text-white"
      >
        <ArrowLeft class="h-3.5 w-3.5 text-[#6c5ce7]" />
        {{ t('amp.back') }}
      </router-link>

      <p class="mb-4 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        {{ t('amp.headerEyebrow') }}
      </p>
      <h1
        class="mb-4 text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl"
      >
        {{ t('amp.headerTitle') }}
      </h1>
      <p class="max-w-lg text-[17px] leading-relaxed text-zinc-400">
        {{ t('amp.headerSubtitle') }}
      </p>
    </div>
  </section>
</template>
