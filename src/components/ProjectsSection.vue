<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight, ArrowUpRight } from '@lucide/vue'

interface ProjectLink {
  label: string
  href: string
  internal?: boolean
}

interface ProjectMsg {
  id: string
  index: string
  title: string
  description: string
  tags: string[]
  points?: string[]
}

const { t, tm } = useI18n()

const projects = computed(() => tm('projects.items') as unknown as ProjectMsg[])

// Links aren't language-dependent — keyed by project id from the locale files.
const projectLinks: Record<string, ProjectLink[]> = {
  amps: [
    { label: 'amp.nyaahibi.web.id', href: '/projects/amp', internal: true },
    { label: 'microamp.nyaahibi.web.id', href: '/projects/microamp', internal: true },
  ],
  furuhibi: [
    { label: 'furuhibi.nyaahibi.web.id', href: '/projects/furuhibi', internal: true },
    { label: 'Live site — furuhibi.nyaahibi.web.id', href: 'https://furuhibi.nyaahibi.web.id' },
  ],
}

function linksFor(id: string): ProjectLink[] {
  return projectLinks[id] ?? []
}
</script>

<template>
  <section id="projects" class="border-b border-foreground/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-primary">
        {{ t('projects.eyebrow') }}
      </p>
      <h2 class="mb-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {{ t('projects.title') }}
      </h2>
      <p class="mb-12 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
        {{ t('projects.intro') }}
      </p>

      <div class="flex flex-col gap-5">
        <article
          v-for="project in projects"
          :key="project.id"
          class="rounded-xl border border-foreground/10 bg-card p-6 transition-colors hover:border-foreground/20 md:p-8"
        >
          <div class="flex items-baseline gap-4">
            <span class="font-mono text-[13px] text-subtle-foreground">{{ project.index }}</span>
            <h3 class="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {{ project.title }}
            </h3>
          </div>

          <p class="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            {{ project.description }}
          </p>

          <ul
            v-if="project.points"
            class="mt-4 flex max-w-2xl flex-col gap-1.5"
          >
            <li
              v-for="point in project.points"
              :key="point"
              class="flex gap-2.5 text-[15px] leading-relaxed text-foreground/80"
            >
              <span class="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-primary" />
              {{ point }}
            </li>
          </ul>

          <div v-if="linksFor(project.id).length" class="mt-5 flex flex-col gap-2">
            <RouterLink
              v-for="link in linksFor(project.id).filter((l) => l.internal)"
              :key="link.href"
              :to="link.href"
              class="group inline-flex w-fit items-center gap-1.5 font-mono text-[13px] text-foreground/80 transition-colors hover:text-foreground"
            >
              <ArrowRight
                class="h-3.5 w-3.5 text-primary transition-transform group-hover:translate-x-0.5"
              />
              {{ link.label }}
            </RouterLink>
            <a
              v-for="link in linksFor(project.id).filter((l) => !l.internal)"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex w-fit items-center gap-1.5 font-mono text-[13px] text-foreground/80 transition-colors hover:text-foreground"
            >
              <ArrowUpRight
                class="h-3.5 w-3.5 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              {{ link.label }}
            </a>
          </div>

          <div class="mt-5 flex flex-wrap gap-2 border-t border-foreground/10 pt-5">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="rounded-full border border-foreground/10 px-3 py-1 font-mono text-xs text-muted-foreground"
            >
              {{ tag }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>