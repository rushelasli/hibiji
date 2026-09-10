<script setup lang="ts">
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'
import { Rocket } from 'lucide-vue-next'

const experiences = [
  {
    period: '2017 - Sekarang',
    title: 'Servis Elektronik',
    desc: 'Freelance Servis barang elektronik TV, Radio, Monitor, PC, Laptop, dll.',
  },
  {
    period: '2023 - Sekarang',
    title: 'Nganggur',
    desc: 'Waktu ini dihabiskan untuk nganggur, nganggur, dan tidur 😋.',
  },
]
</script>

<template>
  <section id="experience" class="bg-[#1f1f50] px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
    <div class="mx-auto max-w-[1100px]">
      <h2 class="mb-8 inline-flex items-center gap-2 font-pixel text-lg leading-relaxed text-[#6c5ce7] md:mb-10 md:text-xl">
        <Rocket class="size-6 shrink-0 text-[#6c5ce7]" /> Experience
      </h2>

      <div class="flex flex-col gap-6">
        <Card
          v-for="(exp, idx) in experiences"
          :key="idx"
          class="border-none bg-[#0d0d1a] shadow-[0_5px_15px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-1"
        >
          <CardContent class="p-5 md:p-6">
            <h3 class="mb-1.5 text-sm font-semibold text-[#55efc4] md:text-base">{{ exp.period }}</h3>
            <p class="mb-2 font-bold text-white">{{ exp.title }}</p>
            <p class="leading-[1.7] text-[#b2bec3]">{{ exp.desc }}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
