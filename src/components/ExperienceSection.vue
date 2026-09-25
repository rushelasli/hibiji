<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface ExperienceMsg {
  period: string
  title: string
  desc: string
}

const { t, tm } = useI18n()

const experiences = computed(() => tm('experience.items') as unknown as ExperienceMsg[])
</script>

<template>
  <section id="experience" class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        {{ t('experience.eyebrow') }}
      </p>
      <h2 class="mb-12 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {{ t('experience.title') }}
      </h2>

      <div class="flex flex-col gap-4">
        <article
          v-for="(exp, i) in experiences"
          :key="i"
          class="rounded-xl border border-white/10 bg-[#101018] p-6 transition-colors hover:border-white/20 md:p-7"
        >
          <p class="mb-2 font-mono text-[13px] text-zinc-500">{{ exp.period }}</p>
          <h3 class="mb-1.5 text-lg font-semibold text-white">{{ exp.title }}</h3>
          <p class="leading-relaxed text-zinc-400">{{ exp.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>