<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface SpecRow {
  label: string
  value: string
}

const { t, tm } = useI18n()

const specs = computed(() => tm('furuhibi.specs') as unknown as SpecRow[])
</script>

<template>
  <section id="products" class="border-b border-foreground/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-primary">
        {{ t('furuhibi.productsEyebrow') }}
      </p>
      <h2 class="mb-10 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {{ t('furuhibi.productsTitle') }}
      </h2>

      <div class="grid items-center gap-8 md:grid-cols-2 md:gap-10">
        <div>
          <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.15em] text-subtle-foreground">
            {{ t('furuhibi.productLabel') }}
          </p>
          <h3 class="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {{ t('furuhibi.productTitle') }}
          </h3>
          <p class="text-[16px] leading-relaxed text-muted-foreground">
            {{ t('furuhibi.productDesc') }}
          </p>

          <dl class="mt-6 flex flex-col">
            <div
              v-for="spec in specs"
              :key="spec.label"
              class="flex items-center justify-between gap-4 border-b border-foreground/10 py-2.5"
            >
              <dt class="text-[14px] text-subtle-foreground">{{ spec.label }}</dt>
              <dd class="text-right font-mono text-[13px] text-foreground/90">
                {{ spec.value }}
              </dd>
            </div>
          </dl>

          <a
            href="#downloads"
            class="mt-6 inline-flex items-center rounded-lg border border-foreground/15 px-5 py-2.5 text-[14px] font-medium text-foreground/90 transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            {{ t('furuhibi.productCta') }}
          </a>
        </div>

        <figure class="overflow-hidden rounded-xl border border-foreground/10 bg-white p-4 md:p-6">
          <img
            src="/projects/furuhibi/audiopipeline.png"
            :alt="t('furuhibi.productAlt')"
            class="w-full"
            loading="lazy"
          />
        </figure>
      </div>
    </div>
  </section>
</template>
