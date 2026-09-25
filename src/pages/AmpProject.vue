<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowLeft } from 'lucide-vue-next'

interface BlockItem {
  title: string
  desc: string
}

interface TestEntry {
  label?: string
  value?: string
  equation?: string
}

interface OsciTest {
  title: string
  entries: TestEntry[]
  showDisclaimer?: boolean
}

interface OsciRow {
  image: string
  caption: string
  tests: OsciTest[]
}

interface RefGroup {
  title: string
  links: { label: string; href: string }[]
}

const { t, tm } = useI18n()

const ampBlocks = computed(() => tm('amp.ampBlocks') as unknown as BlockItem[])
const psuBlocks = computed(() => tm('amp.psuBlocks') as unknown as BlockItem[])
const models = computed(() => tm('amp.models') as unknown as string[])
const osciRows = computed(() => tm('amp.osciRows') as unknown as OsciRow[])
const refGroups = computed(() => tm('amp.refs') as unknown as RefGroup[])

onMounted(async () => {
  await import('@google/model-viewer')
})
</script>

<template>
  <main>
    <!-- Header -->
    <section class="border-b border-white/10">
      <div class="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <router-link
          to="/#projects"
          class="mb-8 inline-flex items-center gap-1.5 font-mono text-[13px] text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft class="h-3.5 w-3.5 text-[#6c5ce7]" />
          {{ t('amp.back') }}
        </router-link>

        <p class="mb-4 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
          {{ t('amp.headerEyebrow') }}
        </p>
        <h1
          class="mb-4 text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl"
        >
          {{ t('amp.headerTitle') }}
        </h1>
        <p class="max-w-lg text-[17px] leading-relaxed text-zinc-400">
          {{ t('amp.headerSubtitle') }}
        </p>
      </div>
    </section>

    <!-- About -->
    <section class="border-b border-white/10">
      <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
        <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
          {{ t('amp.aboutEyebrow') }}
        </p>
        <h2 class="mb-8 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {{ t('amp.aboutTitle') }}
        </h2>

        <div class="flex flex-col-reverse items-center gap-8 md:flex-row md:items-start">
          <div class="flex-1 space-y-4 text-[16px] leading-relaxed text-zinc-400">
            <p v-html="t('amp.aboutP1')" />
            <p>{{ t('amp.aboutP2') }}</p>
          </div>

          <a
            href="https://www.facebook.com/share/17sNHtQkFv/"
            target="_blank"
            rel="noopener noreferrer"
            class="group shrink-0"
          >
            <div class="relative overflow-hidden rounded-xl border border-white/10">
              <img
                src="/projects/amp/maskot.jpg"
                :alt="t('amp.mascotAlt')"
                class="w-52 transition-transform duration-300 group-hover:scale-105 md:w-60"
                loading="lazy"
              />
              <div
                class="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                {{ t('amp.mascotOverlay') }}
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Block Diagram Amplifier -->
    <section class="border-b border-white/10">
      <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
        <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
          {{ t('amp.topologyEyebrow') }}
        </p>
        <h2 class="mb-8 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {{ t('amp.topologyTitle') }}
        </h2>

        <figure class="overflow-hidden rounded-xl border border-white/10 bg-white p-4 md:p-6">
          <div class="overflow-hidden rounded-lg bg-white">
            <img
              src="/projects/amp/TopologiAmp.png"
              :alt="t('amp.topologyAlt')"
              class="w-full"
              loading="lazy"
            />
          </div>
        </figure>

        <ul class="mt-8 flex flex-col gap-4">
          <li v-for="(block, i) in ampBlocks" :key="i" class="flex gap-3">
            <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#6c5ce7]" />
            <div>
              <p class="font-medium text-white">{{ block.title }}</p>
              <p class="mt-0.5 text-[15px] leading-relaxed text-zinc-400">
                {{ block.desc }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Block Diagram Power Supply -->
    <section class="border-b border-white/10">
      <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
        <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
          {{ t('amp.psuEyebrow') }}
        </p>
        <h2 class="mb-8 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {{ t('amp.psuTitle') }}
        </h2>

        <figure class="overflow-hidden rounded-xl border border-white/10 bg-white p-4 md:p-6">
          <div class="overflow-hidden rounded-lg bg-white">
            <img
              src="/projects/amp/BlockSupply.png"
              :alt="t('amp.psuAlt')"
              class="w-full"
              loading="lazy"
            />
          </div>
        </figure>

        <ul class="mt-8 flex flex-col gap-4">
          <li v-for="(block, i) in psuBlocks" :key="i" class="flex gap-3">
            <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#6c5ce7]" />
            <div>
              <p class="font-medium text-white">{{ block.title }}</p>
              <p class="mt-0.5 text-[15px] leading-relaxed text-zinc-400">
                {{ block.desc }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- 3D Views -->
    <section class="border-b border-white/10">
      <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
        <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
          {{ t('amp.threeDEyebrow') }}
        </p>
        <h2 class="mb-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {{ t('amp.threeDTitle') }}
        </h2>
        <p class="mb-10 max-w-xl text-[16px] leading-relaxed text-zinc-400">
          {{ t('amp.threeDIntro') }}
        </p>

        <div class="flex flex-col gap-8">
          <div class="overflow-hidden rounded-xl border border-white/10 bg-[#101018]">
            <div class="border-b border-white/10 px-5 py-4">
              <h3 class="text-lg font-semibold tracking-tight text-white">
                {{ models[0] }}
              </h3>
            </div>
            <model-viewer
              src="/projects/amp/NyaaHibiV2.glb"
              class="w-full"
              style="height: 460px"
              camera-controls
              exposure="0.8"
              shadow-intensity="1"
              environment-image="neutral"
            />
          </div>

          <div class="overflow-hidden rounded-xl border border-white/10 bg-[#101018]">
            <div class="border-b border-white/10 px-5 py-4">
              <h3 class="text-lg font-semibold tracking-tight text-white">
                {{ models[1] }}
              </h3>
            </div>
            <model-viewer
              src="/projects/amp/nyaahibiv2ireng.glb"
              class="w-full"
              style="height: 460px"
              camera-controls
              exposure="0.8"
              shadow-intensity="1"
              environment-image="neutral"
            />
          </div>

          <div class="overflow-hidden rounded-xl border border-white/10 bg-[#101018]">
            <div class="border-b border-white/10 px-5 py-4">
              <h3 class="text-lg font-semibold tracking-tight text-white">
                {{ models[2] }}
              </h3>
            </div>
            <model-viewer
              src="/projects/amp/NyaaHibiV2Nilai.glb"
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

    <!-- Oscilloscope Tests -->
    <section class="border-b border-white/10">
      <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
        <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
          {{ t('amp.osciEyebrow') }}
        </p>
        <h2 class="mb-8 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {{ t('amp.osciTitle') }}
        </h2>

        <div class="flex flex-col gap-10">
          <div
            v-for="row in osciRows"
            :key="row.image"
            class="flex flex-col items-center gap-6 lg:flex-row lg:items-start"
          >
            <div class="shrink-0 text-center">
              <div class="overflow-hidden rounded-xl border border-white/10">
                <img
                  :src="row.image"
                  :alt="row.caption"
                  class="max-w-xs"
                  loading="lazy"
                />
              </div>
              <p class="mt-2 font-mono text-[13px] text-zinc-500">
                {{ row.caption }}
              </p>
            </div>

            <div class="flex flex-1 flex-col gap-4 sm:flex-row">
              <div
                v-for="(test, j) in row.tests"
                :key="j"
                class="osci-text w-full sm:flex-1"
              >
                <p class="label-line">{{ test.title }}</p>
                <p
                  v-for="(entry, k) in test.entries"
                  :key="k"
                  class="mt-1"
                >
                  <span v-if="entry.label" class="label">{{ entry.label }} </span>
                  <span v-if="entry.equation" class="equation">{{ entry.equation }}</span>
                  <span v-if="entry.value" class="value">{{ entry.value }}</span>
                </p>
                <p v-if="test.showDisclaimer" class="disclaimer mt-3">
                  {{ t('amp.disclaimer') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- References -->
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
  </main>
</template>

<style scoped>
.osci-text {
  font-family: 'JetBrains Mono', monospace;
  background: #0b0f14;
  color: #00ff9c;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 12px rgba(0, 255, 156, 0.12);
  font-size: 13px;
  line-height: 1.5;
}

.osci-text .label-line {
  color: #ffffff;
  font-weight: 600;
}

.osci-text .label {
  color: #ffffff;
  font-weight: 600;
}

.osci-text .value {
  color: #00ff9c;
  font-weight: 600;
}

.osci-text .equation {
  background: rgba(0, 255, 156, 0.06);
  padding: 1px 6px;
  margin: 1px 0;
  border-radius: 4px;
  display: inline-block;
}

.osci-text .disclaimer {
  color: #ff6b6b;
  font-style: italic;
}

model-viewer {
  width: 100%;
  height: 460px;
  background: linear-gradient(180deg, #16161d, #101018);
  outline: none;
}
</style>