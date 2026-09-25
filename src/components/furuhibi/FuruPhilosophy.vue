<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface PhilItem {
  kanji: string
  word: string
  desc: string
  tags: string[]
}

const { t, tm } = useI18n()

const philItems = computed(() => tm('furuhibi.philItems') as unknown as PhilItem[])
</script>

<template>
  <section class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        {{ t('furuhibi.philEyebrow') }}
      </p>
      <h2 class="mb-3 max-w-[22ch] text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {{ t('furuhibi.philTitle') }}
      </h2>
      <p class="mb-10 max-w-xl text-[16px] leading-relaxed text-zinc-400">
        {{ t('furuhibi.philIntro') }}
      </p>

      <div class="grid gap-5 md:grid-cols-2">
        <div
          v-for="item in philItems"
          :key="item.word"
          class="rounded-xl border border-white/10 bg-[#101018] p-7"
        >
          <p class="text-4xl font-semibold text-[#6c5ce7]">{{ item.kanji }}</p>
          <p class="mt-2 text-lg font-semibold text-white">{{ item.word }}</p>
          <p class="mt-3 text-[15px] leading-relaxed text-zinc-400">{{ item.desc }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-zinc-400"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <p class="mt-8 text-center font-mono text-[13px] uppercase tracking-[0.2em] text-zinc-500">
        {{ t('furuhibi.philLine') }}
      </p>
    </div>
  </section>
</template>
