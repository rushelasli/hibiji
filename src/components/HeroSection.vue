<script setup lang="ts">
import Badge from '@/components/ui/badge.vue'
import Card from '@/components/ui/card.vue'
import StarfieldCanvas from '@/components/StarfieldCanvas.vue'
import profilImg from '@/assets/profil.png'
import { Lightbulb, Wrench, Hand } from 'lucide-vue-next'
</script>

<template>
  <section id="home" class="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-[#050512] px-4 py-12 md:px-6 md:py-16 lg:px-8">
    <StarfieldCanvas />

    <div class="relative z-10 flex w-full max-w-6xl justify-center">
      <Card class="flex w-full max-w-[1100px] flex-col items-center gap-8 rounded-[25px] border-none bg-[#0d0d1a] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] md:p-8 lg:flex-row lg:gap-12 lg:p-12 xl:p-[60px]">
        <!-- Content -->
        <div class="flex flex-[1.2] flex-col items-center text-center lg:items-start lg:text-left">
          <div class="mb-6 flex flex-wrap justify-center gap-2.5 lg:justify-start">
            <Badge variant="purple" class="inline-flex items-center gap-1 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[1px]"><Lightbulb class="size-3 shrink-0" /> Pemula Banget</Badge>
            <Badge variant="pink" class="inline-flex items-center gap-1 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[1px]"><Wrench class="size-3 shrink-0" /> Masih Belajaran</Badge>
          </div>

          <p class="mb-3.5 inline-flex items-center gap-1.5 text-[1.1rem] text-[#55efc4]"><Hand class="size-5 shrink-0" /> Hai! Saya Ulil Albab</p>

          <h1 class="mb-5 font-pixel text-[1.7rem] leading-[1.3] md:text-[2.2rem] lg:text-[2.8rem]">
            Pemula <br />
            <span class="text-[#6c5ce7]">Elektronik</span>
          </h1>

          <p class="mb-9 max-w-[450px] text-[1.05rem] leading-[1.8] text-[#b2bec3]">
            &gt;seorang pemula di dunia elektronik yang bersemangat belajar dan mengembangkan keterampilan.
            Tujuan saya adalah membuat proyek sederhana hingga menantang sambil menambah pengalaman.
          </p>

          <!-- keep cta placeholder for future -->
          <div class="hidden lg:block" />
        </div>

        <!-- Profile -->
        <div class="flex flex-[0.8] justify-center">
          <div class="relative">
            <div
              class="relative flex h-[220px] w-[220px] items-center justify-center rounded-full bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] p-2.5 shadow-[0_0_40px_rgba(108,92,231,0.4)] sm:h-[260px] sm:w-[260px] md:h-[300px] md:w-[300px] lg:h-[320px] lg:w-[320px]"
            >
              <img
                :src="profilImg"
                alt="Ulil Albab Profile"
                class="h-full w-full rounded-full object-cover"
                loading="eager"
              />
            </div>

            <!-- Floating badges - hidden on very small screens, shown from sm -->
            <div
              class="absolute -left-2 top-3 hidden whitespace-nowrap rounded-full bg-[#5f48e8] px-3 py-2 text-[10px] font-bold shadow-[0_10px_20px_rgba(0,0,0,0.3)] sm:block md:-left-4 md:px-4 md:text-[11px] lg:-left-7"
            >
              Belajar Mulu Perasaan
            </div>
            <div
              class="absolute -right-2 bottom-6 hidden whitespace-nowrap rounded-full bg-[#6c5ce7] px-3 py-2 text-[10px] font-bold shadow-[0_10px_20px_rgba(0,0,0,0.3)] sm:block md:-right-3 md:px-4 md:text-[11px] lg:-right-5"
            >
              Jadi Sepuhnya Kapan?
            </div>
          </div>
        </div>

        <!-- Mobile floating badges as inline pills below image -->
        <div class="flex flex-wrap justify-center gap-2 sm:hidden">
          <span class="rounded-full bg-[#5f48e8] px-4 py-2 text-xs font-bold">Belajar Mulu Perasaan</span>
          <span class="rounded-full bg-[#6c5ce7] px-4 py-2 text-xs font-bold">Jadi Sepuhnya Kapan?</span>
        </div>
      </Card>
    </div>
  </section>
</template>
