<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-white/10">
    <div
      class="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 px-5 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center md:px-8"
    >
      <span>© {{ year }} Ulil Albab</span>
      <span class="font-mono text-xs">Built with Vue</span>
    </div>
  </footer>
</template>
