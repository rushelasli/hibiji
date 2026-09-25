<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  /** i18n key for the section eyebrow */
  eyebrowKey: string
  /** i18n key for the section title */
  titleKey: string
  /** i18n keys for the section paragraphs (rendered as HTML) */
  paragraphKeys: string[]
}>()

const { t } = useI18n()
</script>

<template>
  <section class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        {{ t(eyebrowKey) }}
      </p>
      <h2 class="mb-8 text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {{ t(titleKey) }}
      </h2>

      <div class="max-w-3xl space-y-4 text-[16px] leading-relaxed text-zinc-400">
        <p v-for="key in paragraphKeys" :key="key" v-html="t(key)" />
      </div>
    </div>
  </section>
</template>
