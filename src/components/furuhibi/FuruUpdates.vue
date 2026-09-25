<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface UpdateRow {
  tag: string
  desc: string
  version: string
}

const { t, tm } = useI18n()

const updates = computed(() => tm('furuhibi.updates') as unknown as UpdateRow[])
</script>

<template>
  <section class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        {{ t('furuhibi.updatesEyebrow') }}
      </p>
      <h2 class="mb-10 text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {{ t('furuhibi.updatesTitle') }}
      </h2>

      <div class="flex flex-col gap-4">
        <div
          v-for="(row, i) in updates"
          :key="i"
          class="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-white/10 bg-[#101018] px-5 py-4"
        >
          <span
            class="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-[#6c5ce7]"
          >
            {{ row.tag }}
          </span>
          <p class="min-w-48 flex-1 text-[15px] leading-relaxed text-zinc-300">
            {{ row.desc }}
          </p>
          <span class="font-mono text-[13px] text-zinc-500">{{ row.version }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
