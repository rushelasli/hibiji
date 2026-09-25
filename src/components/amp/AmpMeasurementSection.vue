<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

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

const { t, tm } = useI18n()

const osciRows = computed(() => tm('amp.osciRows') as unknown as OsciRow[])
</script>

<template>
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
</style>
