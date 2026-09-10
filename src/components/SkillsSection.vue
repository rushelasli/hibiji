<script setup lang="ts">
import { Code, Wrench, Monitor, Globe, Plug, Moon, Smartphone } from 'lucide-vue-next'

const skills = [
  {
    icon: Code,
    label: 'Ngoding',
    desc: 'Membuat script, web, dan proyek Python/Arduino minta ngoding sama cgpt.',
    gradient: 'from-[#6c5ce7] to-[#a29bfe]',
  },
  {
    icon: Wrench,
    label: 'Elektronika',
    desc: 'Analog & digital, PCB, tabung vakum, sirkuit menantang.',
    gradient: 'from-[#ff7675] to-[#fd79a8]',
  },
  {
    icon: Monitor,
    label: 'PC & Komputer',
    desc: 'Setting OS, optimasi, eksperimen software.',
    gradient: 'from-[#55efc4] to-[#00b894]',
  },
  {
    icon: Globe,
    label: 'Jaringan',
    desc: 'Kabel & switch, santai aja, jangan mikrotik XD',
    gradient: 'from-[#fdcb6e] to-[#e17055]',
  },
  {
    icon: Plug,
    label: 'Servis Elektronika',
    desc: 'Perbaikan barang elektronika.',
    gradient: 'from-[#00cec9] to-[#0984e3]',
  },
  {
    icon: Moon,
    label: 'Tidur & Malas',
    desc: 'Hobi paling gwe suka.',
    gradient: 'from-[#d63031] to-[#e84393]',
  },
  {
    icon: Smartphone,
    label: 'Scroll Fesnuk',
    desc: 'Scroll fesnuk tiada henti',
    gradient: 'from-[#6c5ce7] to-[#a29bfe]',
  },
]
</script>

<template>
  <section id="skills" class="bg-[#1a1a3d] px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
    <div class="mx-auto max-w-[1100px] text-center">
      <h2 class="mb-6 inline-flex items-center justify-center gap-2 font-pixel text-lg leading-relaxed text-[#6c5ce7] md:text-xl">
        <Code class="size-6 shrink-0 text-[#6c5ce7]" /> Skills & Hobi
      </h2>

      <p class="mx-auto mb-10 max-w-[700px] leading-[1.8] text-[#b2bec3]">
        Scroll fensuk tiada henti, nganggur, dan tidur adalah hobi paling ku suka :D
      </p>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="(skill, idx) in skills"
          :key="idx"
          :class="[
            'rounded-[15px] bg-gradient-to-br p-5 text-white shadow-[0_8px_20px_rgba(0,0,0,0.5)] transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_12px_25px_rgba(0,0,0,0.6)] text-left sm:text-left flex flex-col min-h-[140px]',
            skill.gradient,
          ]"
        >
          <component :is="skill.icon" class="mb-3 size-7 shrink-0 text-white" />
          <h3 class="mb-2 text-base font-bold md:text-lg">{{ skill.label }}</h3>
          <p class="text-sm leading-relaxed text-white/90">{{ skill.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
