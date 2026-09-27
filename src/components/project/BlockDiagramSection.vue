<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface BlockItem {
  title: string
  desc: string
}

defineProps<{
  /** i18n key for the section eyebrow */
  eyebrowKey: string
  /** i18n key for the section title */
  titleKey: string
  /** Optional image path (white-background block diagram); omitted to show only the list */
  image?: string
  /** i18n key for the image alt text */
  altKey?: string
  blocks: BlockItem[]
}>()

const { t } = useI18n()
</script>

<template>
  <section class="border-b border-foreground/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-primary">
        {{ t(eyebrowKey) }}
      </p>
      <h2 class="mb-8 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {{ t(titleKey) }}
      </h2>

      <figure v-if="image" class="overflow-hidden rounded-xl border border-foreground/10 bg-white p-4 md:p-6">
        <div class="overflow-hidden rounded-lg bg-white">
          <img :src="image" :alt="altKey ? t(altKey) : ''" class="w-full" loading="lazy" />
        </div>
      </figure>

      <ul :class="image ? 'mt-8' : ''" class="flex flex-col gap-4">
        <li v-for="(block, i) in blocks" :key="i" class="flex gap-3">
          <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
          <div>
            <p class="font-medium text-foreground">{{ block.title }}</p>
            <p class="mt-0.5 text-[15px] leading-relaxed text-muted-foreground">
              {{ block.desc }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
