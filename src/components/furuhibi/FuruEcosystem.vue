<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface EcoItem {
  num: string
  title: string
  desc: string
}

const { t, tm } = useI18n()

const ecoItems = computed(() => tm('furuhibi.ecoItems') as unknown as EcoItem[])
</script>

<template>
  <section id="software" class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        {{ t('furuhibi.ecoEyebrow') }}
      </p>
      <h2 class="mb-3 max-w-[22ch] text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {{ t('furuhibi.ecoTitle') }}
      </h2>
      <p class="mb-10 max-w-xl text-[16px] leading-relaxed text-zinc-400">
        {{ t('furuhibi.ecoIntro') }}
      </p>

      <div class="grid gap-5 md:grid-cols-3">
        <div
          v-for="item in ecoItems"
          :key="item.num"
          class="rounded-xl border border-white/10 bg-[#101018] p-6 transition-colors hover:border-white/20"
        >
          <p class="mb-3 font-mono text-[13px] text-[#6c5ce7]">{{ item.num }}</p>
          <h3 class="mb-2 text-lg font-semibold tracking-tight text-white">
            {{ item.title }}
          </h3>
          <p class="text-[15px] leading-relaxed text-zinc-400">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
