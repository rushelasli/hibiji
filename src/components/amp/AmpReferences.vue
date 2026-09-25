<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface RefGroup {
  title: string
  links: { label: string; href: string }[]
}

const { t, tm } = useI18n()

const refGroups = computed(() => tm('amp.refs') as unknown as RefGroup[])
</script>

<template>
  <section class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        {{ t('amp.notesEyebrow') }}
      </p>
      <h2 class="mb-8 text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {{ t('amp.notesTitle') }}
      </h2>

      <div class="grid gap-5 md:grid-cols-3">
        <div
          v-for="(group, i) in refGroups"
          :key="i"
          class="rounded-xl border border-white/10 bg-[#101018] p-6"
        >
          <h3 class="mb-4 font-semibold text-white">{{ group.title }}</h3>
          <div class="flex flex-col gap-2">
            <a
              v-for="link in group.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center rounded-lg border border-white/15 px-4 py-2 text-center text-[13px] font-medium text-zinc-200 transition-colors hover:border-white/30 hover:text-white"
            >
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
