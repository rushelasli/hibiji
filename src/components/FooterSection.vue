<script setup lang="ts">
import { useServerTime } from '@/composables/useServerTime'

const { time } = useServerTime()
</script>

<template>
  <footer class="relative z-10 bg-[#0d0d1a] px-4 py-6 text-center text-sm text-[#b2bec3] md:px-6">
    <div>© Ulil Albab - Nyaahibi Developer</div>
    <div class="mt-1.5 text-xs md:text-sm">Waktu Server: {{ time }}</div>
  </footer>
</template>
