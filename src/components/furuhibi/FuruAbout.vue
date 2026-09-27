<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <!-- Personal profile block (photo + socials) intentionally not ported -->
  <section id="about" class="border-b border-foreground/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-primary">
        {{ t('furuhibi.aboutEyebrow') }}
      </p>
      <h2 class="mb-8 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {{ t('furuhibi.aboutTitle') }}
      </h2>

      <div class="max-w-3xl space-y-4 text-[16px] leading-relaxed text-muted-foreground">
        <p v-html="t('furuhibi.aboutP1')" />
        <p v-html="t('furuhibi.aboutP2')" />
      </div>
    </div>
  </section>
</template>
