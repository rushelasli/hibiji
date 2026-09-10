<script setup lang="ts">
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'
import CardHeader from '@/components/ui/card-header.vue'
import CardTitle from '@/components/ui/card-title.vue'
import { Zap } from 'lucide-vue-next'

const projects = [
  {
    title: 'Headamp',
    description:
      'Koleksi proyek headphone amplifier yang aku kembangkan, mulai dari desain analog, hybrid, hingga discrete Operational Amplifier. Fokus pada kualitas audio, transparansi, dan eksperimen tabung.',
    links: [
      { label: 'Nyaahibi', href: 'https://nyaahibi.nggonku.web.id', display: 'nyaahibi.nggonku.web.id' },
      { label: 'NyaahibiV2 amp', href: 'https://amp.nyaahibi.web.id', display: 'amp.nyaahibi.web.id' },
      { label: 'MicroHibi', href: 'https://microamp.nyaahibi.web.id', display: 'microamp.nyaahibi.web.id' },
      { label: 'NyaaOP - Discrete OPamp', href: 'https://nyaaop.nyaahibi.web.id', display: 'nyaaop.nyaahibi.web.id' },
    ],
  },
  {
    title: 'Build Homeserver & IoT',
    description:
      'Membangun ekosistem smart home dan server pribadi. Semua layanan dijalankan secara lokal untuk kontrol penuh, keamanan, dan eksperimen.',
    points: [
      'Sistem IoT rumah terpusat dengan ESP32 & ESP8266',
      'NAS storage terpusat untuk backup & media',
      'Full selfhost server untuk layanan lokal (web, cloud, media)',
    ],
  },
  {
    title: 'Keyboard Mechanical',
    description:
      'Proyek ini menggabungkan hobi elektronik & komputer: membangun keyboard dan macropad wireless custom, sekaligus eksperimen firmware dan microcontroller.',
    points: [
      'Handwire custom keyboard dengan layout unik',
      'Support VIA untuk konfigurasi keymap mudah',
      'Macropad wireless menggunakan ESP32 + OLED',
    ],
  },
]
</script>

<template>
  <section id="projects" class="bg-[#14142b] px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
    <div class="mx-auto max-w-[1100px]">
      <h2 class="mb-8 inline-flex w-full items-center justify-center gap-2 text-center font-pixel text-lg leading-relaxed text-[#6c5ce7] md:mb-10 md:text-xl">
        <Zap class="size-6 shrink-0 text-[#6c5ce7]" /> Projects
      </h2>

      <div class="flex flex-col gap-6">
        <Card
          v-for="(project, idx) in projects"
          :key="idx"
          class="border-none bg-[#0d0d1a] shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,0,0,0.5)]"
        >
          <CardHeader class="pb-3">
            <CardTitle class="text-lg text-[#55efc4] md:text-xl">{{ project.title }}</CardTitle>
          </CardHeader>
          <CardContent class="pt-0">
            <ul
              v-if="project.links"
              class="ml-5 list-disc space-y-1 leading-[1.7] text-[#b2bec3] marker:text-[#6c5ce7]"
            >
              <li v-for="link in project.links" :key="link.href">
                <strong class="text-white">{{ link.label }}</strong>
                <span class="hidden sm:inline"> - </span>
                <br class="sm:hidden" />
                <a
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="break-all text-[#6c5ce7] underline decoration-[#6c5ce7]/50 underline-offset-2 transition hover:text-[#a29bfe] hover:decoration-[#a29bfe]"
                >{{ link.display }}</a>
              </li>
            </ul>

            <ul
              v-else-if="project.points"
              class="ml-5 list-disc space-y-1 leading-[1.7] text-[#b2bec3] marker:text-[#6c5ce7]"
            >
              <li v-for="point in project.points" :key="point">{{ point }}</li>
            </ul>

            <p class="mt-3 leading-[1.7] text-[#b2bec3]">
              {{ project.description }}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
