<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Badge from '@/components/ui/badge.vue'
import biniGif from '@/assets/bini.gif'
import { Hand, Music, Zap } from 'lucide-vue-next'

const visible = ref(false)
const containerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const el = containerRef.value
  if (!el) return

  // IntersectionObserver for fade-in
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visible.value = true
          observer.disconnect()
          break
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -100px 0px' },
  )
  observer.observe(el)

  // Fallback: check if already visible on load
  const rect = el.getBoundingClientRect()
  if (rect.top < window.innerHeight - 100) {
    visible.value = true
    observer.disconnect()
  }
})
</script>

<template>
  <section id="about" class="bg-[#111125] px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
    <div
      ref="containerRef"
      :class="[
        'mx-auto flex max-w-[1100px] flex-col items-center gap-8 transition-all duration-1000 ease-out lg:flex-row lg:items-start lg:gap-12',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
      ]"
    >
      <!-- Left - GIF -->
      <div class="flex w-full justify-center lg:w-[40%] lg:shrink-0">
        <img
          :src="biniGif"
          alt="GIF Bini"
          class="w-full max-w-[260px] rounded-[20px] transition duration-300 [filter:drop-shadow(0_0_2px_white)_drop-shadow(0_0_2px_white)] hover:scale-[1.02] sm:max-w-[300px]"
          loading="lazy"
        />
      </div>

      <!-- Right - Content -->
      <div class="w-full text-center text-white lg:w-[60%] lg:text-left">
        <h2 class="mb-5 inline-flex items-center gap-2 font-pixel text-lg leading-relaxed text-[#6c5ce7] md:text-xl"><Hand class="size-6 shrink-0 text-[#6c5ce7]" /> Hai, saya Ulil Albab</h2>

        <p class="mb-5 leading-[1.7] text-white/90">
          Saya seorang pemula yang bersemangat di dunia elektronik, baik <strong>analog</strong> maupun <strong>digital</strong>.
          Selain itu saya juga senang belajar <strong>komputer</strong>, <strong>jaringan</strong>, dan sekarang menjadi penikmat
          <strong>tabung vakum</strong>.
        </p>

        <h3 class="mb-2.5 mt-6 inline-flex items-center gap-2 text-lg font-semibold text-[#55efc4]"><Music class="size-5 shrink-0" /> Hobi &amp; Minat</h3>
        <ul class="mb-5 list-disc pl-5 text-left leading-[1.7] marker:text-[#6c5ce7] sm:inline-block lg:block">
          <li>Mendengarkan musik</li>
          <li>Menonton anime</li>
          <li>Mengutak-atik elektronik dan tabung vakum</li>
          <li>Belajar komputer &amp; jaringan</li>
        </ul>

        <h3 class="mb-2.5 mt-6 inline-flex items-center gap-2 text-lg font-semibold text-[#55efc4]"><Zap class="size-5 shrink-0" /> Skill</h3>
        <div class="flex flex-wrap justify-center gap-2.5 lg:justify-start">
          <Badge variant="purple" class="px-3 py-1 text-xs sm:text-sm">Elektronika Analog</Badge>
          <Badge variant="purple" class="px-3 py-1 text-xs sm:text-sm">Elektronika Digital</Badge>
          <Badge variant="pink" class="px-3 py-1 text-xs sm:text-sm">Komputer</Badge>
          <Badge variant="pink" class="px-3 py-1 text-xs sm:text-sm">Jaringan</Badge>
          <Badge variant="purple" class="px-3 py-1 text-xs sm:text-sm">Tabung Vakum</Badge>
        </div>
      </div>
    </div>
  </section>
</template>
