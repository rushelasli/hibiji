<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface DownloadCard {
  platform: string
  tag: string
  latestLabel: string
  version: string
  downloadLabel: string
  historyLabel: string
  href: string
  history: { version: string; label: string; href: string }[]
}

const { t, tm } = useI18n()

// Installers link to the live origin — the archives/APKs are not ported.
const downloads = computed(() => tm('furuhibi.downloads') as unknown as DownloadCard[])
</script>

<template>
  <section id="downloads" class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        {{ t('furuhibi.downloadsEyebrow') }}
      </p>
      <h2 class="mb-10 text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {{ t('furuhibi.downloadsTitle') }}
      </h2>

      <div class="grid gap-5 md:grid-cols-2">
        <div
          v-for="card in downloads"
          :key="card.platform"
          class="rounded-xl border border-white/10 bg-[#101018] p-6"
        >
          <div class="flex items-center justify-between gap-3">
            <h3 class="text-xl font-semibold tracking-tight text-white">
              {{ card.platform }}
            </h3>
            <span
              class="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-zinc-400"
            >
              {{ card.tag }}
            </span>
          </div>

          <div class="mt-5 flex items-end justify-between gap-4">
            <div>
              <p class="font-mono text-[13px] text-zinc-500">{{ card.latestLabel }}</p>
              <p class="font-mono text-2xl font-semibold text-white">{{ card.version }}</p>
            </div>
            <a
              :href="card.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center rounded-lg bg-[#6c5ce7] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#7d6ef0]"
            >
              {{ card.downloadLabel }}
            </a>
          </div>

          <details class="mt-5 border-t border-white/10 pt-4">
            <summary
              class="cursor-pointer list-none font-mono text-[13px] text-zinc-400 transition-colors hover:text-white"
            >
              {{ card.historyLabel }}
            </summary>
            <div
              v-for="entry in card.history"
              :key="entry.version"
              class="mt-3 flex items-center justify-between gap-3"
            >
              <span class="font-mono text-[13px] text-zinc-500">{{ entry.version }}</span>
              <a
                :href="entry.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[13px] text-zinc-300 underline decoration-[#6c5ce7] underline-offset-4 transition-colors hover:text-white"
              >
                {{ entry.label }}
              </a>
            </div>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>
