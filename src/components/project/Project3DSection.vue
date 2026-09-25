<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{
    /** i18n namespace for this project's copy (e.g. "amp", "microamp") */
    ns?: string
    /** GLB files to preview — amp-family projects share the same models */
    files?: string[]
  }>(),
  {
    ns: 'amp',
    files: () => [
      '/projects/amp/NyaaHibiV2.glb',
      '/projects/amp/nyaahibiv2ireng.glb',
      '/projects/amp/NyaaHibiV2Nilai.glb',
    ],
  },
)

const { t, tm } = useI18n()

const models = computed(() => tm(props.ns + '.models') as unknown as string[])

onMounted(async () => {
  await import('@google/model-viewer')
})
</script>

<template>
  <section class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        {{ t(props.ns + '.threeDEyebrow') }}
      </p>
      <h2 class="mb-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {{ t(props.ns + '.threeDTitle') }}
      </h2>
      <p class="mb-10 max-w-xl text-[16px] leading-relaxed text-zinc-400">
        {{ t(props.ns + '.threeDIntro') }}
      </p>

      <div class="flex flex-col gap-8">
        <div
          v-for="(file, i) in props.files"
          :key="file"
          class="overflow-hidden rounded-xl border border-white/10 bg-[#101018]"
        >
          <div class="border-b border-white/10 px-5 py-4">
            <h3 class="text-lg font-semibold tracking-tight text-white">
              {{ models[i] }}
            </h3>
          </div>
          <model-viewer
            :src="file"
            class="w-full"
            style="height: 460px"
            camera-controls
            exposure="0.8"
            shadow-intensity="1"
            environment-image="neutral"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
model-viewer {
  width: 100%;
  height: 460px;
  background: linear-gradient(180deg, #16161d, #101018);
  outline: none;
}
</style>
