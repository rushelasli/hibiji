<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{
    /** i18n namespace for this project's copy (e.g. "amp", "microamp") */
    ns?: string
    /** Path to the project mascot photo (portraits credited to Flassy) */
    image?: string
  }>(),
  { ns: 'amp', image: '/projects/amp/maskot.jpg' },
)

const { t } = useI18n()

// Photo album shared by the amp-family mascots
const creditHref = 'https://www.facebook.com/share/17sNHtQkFv/'
</script>

<template>
  <section class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        {{ t(props.ns + '.aboutEyebrow') }}
      </p>
      <h2 class="mb-8 text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {{ t(props.ns + '.aboutTitle') }}
      </h2>

      <div class="flex flex-col-reverse items-center gap-8 md:flex-row md:items-start">
        <div class="flex-1 space-y-4 text-[16px] leading-relaxed text-zinc-400">
          <p v-html="t(props.ns + '.aboutP1')" />
          <p v-html="t(props.ns + '.aboutP2')" />
        </div>

        <a :href="creditHref" target="_blank" rel="noopener noreferrer" class="group shrink-0">
          <div class="relative overflow-hidden rounded-xl border border-white/10">
            <img
              :src="props.image"
              :alt="t(props.ns + '.mascotAlt')"
              class="w-52 transition-transform duration-300 group-hover:scale-105 md:w-60"
              loading="lazy"
            />
            <div
              class="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              {{ t(props.ns + '.mascotOverlay') }}
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
