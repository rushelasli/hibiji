<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowLeft } from '@lucide/vue'

const props = withDefaults(
  defineProps<{
    /** i18n namespace for this project's copy (e.g. "amp", "microamp") */
    ns?: string
    /**
     * Plain back href — set by the projects hub, which has no router.
     * When omitted, falls back to a router link back to the portfolio
     * project list (the default for the standalone portfolio app).
     */
    backHref?: string
  }>(),
  { ns: 'amp' },
)

const { t } = useI18n()
</script>

<template>
  <section class="border-b border-foreground/10">
    <div class="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
      <component
        :is="props.backHref ? 'a' : 'router-link'"
        v-bind="props.backHref ? { href: props.backHref } : { to: '/#projects' }"
        class="mb-8 inline-flex items-center gap-1.5 font-mono text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft class="h-3.5 w-3.5 text-primary" />
        {{ t(props.ns + '.back') }}
      </component>

      <p class="mb-4 font-mono text-[13px] uppercase tracking-[0.2em] text-primary">
        {{ t(props.ns + '.headerEyebrow') }}
      </p>
      <h1
        class="mb-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl"
      >
        {{ t(props.ns + '.headerTitle') }}
      </h1>
      <p class="max-w-lg text-[17px] leading-relaxed text-muted-foreground">
        {{ t(props.ns + '.headerSubtitle') }}
      </p>
    </div>
  </section>
</template>
