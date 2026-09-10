<script setup lang="ts">
import { MailPlus } from 'lucide-vue-next'

const socials = [
  {
    href: 'https://www.facebook.com/share/1AiX1D61gs/',
    label: 'Facebook',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg',
  },
  {
    href: 'https://www.instagram.com/ulil_albab.05?igsh=cXF1dzlmd2dseHNm',
    label: 'Instagram',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg',
  },
  {
    href: 'https://x.com/UlilAlbab13012',
    label: 'X (Twitter)',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg',
  },
  {
    href: 'https://www.youtube.com/@KopiKapalApimix',
    label: 'YouTube',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg',
  },
  {
    href: 'mailto:ulil@example.com',
    label: 'Email',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/maildotru.svg',
  },
  {
    href: 'https://github.com/MUlilA',
    label: 'GitHub',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
  },
]
</script>

<template>
  <section id="contact" class="bg-[#2b2b88] px-4 py-16 text-center text-white md:px-6 md:py-20 lg:px-8">
    <div class="mx-auto max-w-[800px]">
      <h2 class="mb-8 inline-flex items-center justify-center gap-2 font-pixel text-base leading-relaxed text-[#6c5ce7] md:mb-10 md:text-lg">
        <MailPlus class="size-6 shrink-0 text-[#6c5ce7]" /> Contact Me
      </h2>

      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <a
          v-for="s in socials"
          :key="s.label"
          :href="s.href"
          target="_blank"
          rel="noopener noreferrer"
          :title="s.label"
          :aria-label="s.label"
          class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 p-3 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-[#6c5ce7] hover:shadow-[0_8px_20px_rgba(108,92,231,0.4)] sm:h-14 sm:w-14"
        >
          <img
            :src="s.icon"
            :alt="s.label"
            class="h-6 w-6 brightness-0 invert sm:h-7 sm:w-7"
            loading="lazy"
          />
        </a>
      </div>

      <p class="mt-8 text-sm leading-relaxed text-white/90 md:mt-10 md:text-base">
        -terbuka untuk diskusi proyek, kolaborasi, atau sekadar ngobrol hal seru 😄-
      </p>
    </div>
  </section>
</template>
