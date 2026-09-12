<script setup lang="ts">
import { Code, Wrench, Monitor, Globe, Plug, Moon, Smartphone } from 'lucide-vue-next'

const skills = [
  {
    icon: Code,
    label: 'Coding',
    desc: 'Scripts, web, and Python/Arduino projects.',
  },
  {
    icon: Wrench,
    label: 'Electronics',
    desc: 'Analog & digital, PCBs, vacuum tubes, challenging circuits.',
  },
  {
    icon: Monitor,
    label: 'PC & Computers',
    desc: 'OS setup, optimization, software experiments.',
  },
  {
    icon: Globe,
    label: 'Networking',
    desc: 'Cabling & switching — the fun parts, no MikroTik trauma.',
  },
  {
    icon: Plug,
    label: 'Electronics Repair',
    desc: 'Fixing TVs, radios, monitors, PCs, and laptops.',
  },
  {
    icon: Moon,
    label: 'Rest & Recharge',
    desc: 'Essential hobby. Sleep is a feature.',
  },
  {
    icon: Smartphone,
    label: 'Scrolling',
    desc: 'Endless social media scrolling. We all do it.',
  },
]
</script>

<template>
  <section id="skills" class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        Skills
      </p>
      <h2 class="mb-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        What I do
      </h2>
      <p class="mb-12 max-w-xl text-[16px] leading-relaxed text-zinc-400">
        A mix of hands-on electronics, computers, and honest hobbies.
      </p>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="skill in skills"
          :key="skill.label"
          class="rounded-xl border border-white/10 bg-[#101018] p-6 transition-colors hover:border-white/20"
        >
          <component :is="skill.icon" class="mb-4 h-6 w-6 text-[#6c5ce7]" />
          <h3 class="mb-1.5 text-base font-semibold text-white">{{ skill.label }}</h3>
          <p class="text-sm leading-relaxed text-zinc-400">{{ skill.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
