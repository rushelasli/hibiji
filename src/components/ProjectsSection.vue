<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'

interface ProjectLink {
  label: string
  href: string
}

interface Project {
  index: string
  title: string
  description: string
  tags: string[]
  links?: ProjectLink[]
  points?: string[]
}

const projects: Project[] = [
  {
    index: '01',
    title: 'Headphone Amplifiers',
    description:
      'A series of headphone amplifier builds — from analog and hybrid designs to a fully discrete op-amp. Focused on audio transparency and learning through iteration.',
    tags: ['Analog', 'Discrete Op-Amp', 'Tube'],
    links: [
      { label: 'nyaahibi.nggonku.web.id', href: 'https://nyaahibi.nggonku.web.id' },
      { label: 'amp.nyaahibi.web.id', href: 'https://amp.nyaahibi.web.id' },
      { label: 'microamp.nyaahibi.web.id', href: 'https://microamp.nyaahibi.web.id' },
      { label: 'nyaaop.nyaahibi.web.id', href: 'https://nyaaop.nyaahibi.web.id' },
    ],
  },
  {
    index: '02',
    title: 'Homeserver & IoT',
    description:
      'A self-hosted home ecosystem: centralized IoT, local NAS storage, and on-prem services — full control, no cloud dependency.',
    tags: ['ESP32', 'ESP8266', 'Self-hosted', 'NAS'],
    points: [
      'Centralized home IoT on ESP32 & ESP8266',
      'Local NAS for backup and media',
      'Self-hosted services (web, cloud, media)',
    ],
  },
  {
    index: '03',
    title: 'Custom Mechanical Keyboards',
    description:
      'Hand-wired custom keyboards and wireless macropads — combining electronics with firmware experiments.',
    tags: ['Handwire', 'VIA', 'ESP32 + OLED'],
    points: [
      'Hand-wired boards with custom layouts',
      'VIA support for easy keymap configuration',
      'Wireless macropad on ESP32 with OLED display',
    ],
  },
]
</script>

<template>
  <section id="projects" class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        Projects
      </p>
      <h2 class="mb-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Selected work
      </h2>
      <p class="mb-12 max-w-xl text-[16px] leading-relaxed text-zinc-400">
        Three areas I keep coming back to — audio electronics, home
        infrastructure, and input devices.
      </p>

      <div class="flex flex-col gap-5">
        <article
          v-for="project in projects"
          :key="project.title"
          class="rounded-xl border border-white/10 bg-[#101018] p-6 transition-colors hover:border-white/20 md:p-8"
        >
          <div class="flex items-baseline gap-4">
            <span class="font-mono text-[13px] text-zinc-500">{{ project.index }}</span>
            <h3 class="text-xl font-semibold tracking-tight text-white md:text-2xl">
              {{ project.title }}
            </h3>
          </div>

          <p class="mt-3 max-w-2xl leading-relaxed text-zinc-400">
            {{ project.description }}
          </p>

          <ul
            v-if="project.points"
            class="mt-4 flex max-w-2xl flex-col gap-1.5"
          >
            <li
              v-for="point in project.points"
              :key="point"
              class="flex gap-2.5 text-[15px] leading-relaxed text-zinc-300"
            >
              <span class="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#6c5ce7]" />
              {{ point }}
            </li>
          </ul>

          <div v-if="project.links" class="mt-5 flex flex-col gap-2">
            <a
              v-for="link in project.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex w-fit items-center gap-1.5 font-mono text-[13px] text-zinc-300 transition-colors hover:text-white"
            >
              <ArrowUpRight
                class="h-3.5 w-3.5 text-[#6c5ce7] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              {{ link.label }}
            </a>
          </div>

          <div class="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-5">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-zinc-400"
            >
              {{ tag }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
