<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const interests = computed(() => tm('about.interests') as unknown as string[])
const tags = computed(() => tm('about.tags') as unknown as string[])
</script>

<template>
  <section id="about" class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        {{ t('about.eyebrow') }}
      </p>
      <h2 class="mb-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {{ t('about.title') }}
      </h2>
      <p
        class="mb-10 max-w-2xl text-[16px] leading-relaxed text-zinc-400"
        v-html="t('about.intro')"
      />

      <div class="grid gap-5 md:grid-cols-2">
        <div class="rounded-xl border border-white/10 bg-[#101018] p-6">
          <h3 class="mb-4 text-base font-semibold text-white">
            {{ t('about.interestsTitle') }}
          </h3>
          <ul class="flex flex-col gap-2.5">
            <li
              v-for="item in interests"
              :key="item"
              class="flex gap-2.5 text-[15px] leading-relaxed text-zinc-300"
            >
              <span class="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#6c5ce7]" />
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="rounded-xl border border-white/10 bg-[#101018] p-6">
          <h3 class="mb-4 text-base font-semibold text-white">
            {{ t('about.focusTitle') }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in tags"
              :key="tag"
              class="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-zinc-400"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>