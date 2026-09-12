<script setup lang="ts">
const experiences = [
  {
    period: '2017 — Present',
    title: 'Electronics Repair',
    desc: 'Freelance repair of TVs, radios, monitors, PCs, laptops, and more.',
  },
  {
    period: '2023 — Present',
    title: 'Self-Directed Learning',
    desc: 'Deep-diving into headphone amplifiers, homeservers, and custom keyboards.',
  },
]
</script>

<template>
  <section id="experience" class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        Experience
      </p>
      <h2 class="mb-12 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Where I've been
      </h2>

      <div class="flex flex-col gap-4">
        <article
          v-for="exp in experiences"
          :key="exp.title"
          class="rounded-xl border border-white/10 bg-[#101018] p-6 transition-colors hover:border-white/20 md:p-7"
        >
          <p class="mb-2 font-mono text-[13px] text-zinc-500">{{ exp.period }}</p>
          <h3 class="mb-1.5 text-lg font-semibold text-white">{{ exp.title }}</h3>
          <p class="leading-relaxed text-zinc-400">{{ exp.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
