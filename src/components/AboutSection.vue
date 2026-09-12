<script setup lang="ts">
const interests = [
  'Listening to music',
  'Watching anime',
  'Tinkering with electronics and vacuum tubes',
  'Learning computers & networking',
]

const tags = [
  'Analog Electronics',
  'Digital Electronics',
  'Computers',
  'Networking',
  'Vacuum Tubes',
]
</script>

<template>
  <section id="about" class="border-b border-white/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-[#6c5ce7]">
        About
      </p>
      <h2 class="mb-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Hi, I'm Ulil Albab
      </h2>
      <p class="mb-10 max-w-2xl text-[16px] leading-relaxed text-zinc-400">
        A beginner with real enthusiasm for electronics — both
        <span class="text-zinc-200">analog</span> and
        <span class="text-zinc-200">digital</span>. I also enjoy learning about
        <span class="text-zinc-200">computers</span>,
        <span class="text-zinc-200">networking</span>, and lately I've become
        a fan of <span class="text-zinc-200">vacuum tubes</span>.
      </p>

      <div class="grid gap-5 md:grid-cols-2">
        <div class="rounded-xl border border-white/10 bg-[#101018] p-6">
          <h3 class="mb-4 text-base font-semibold text-white">
            Interests
          </h3>
          <ul class="flex flex-col gap-2.5">
            <li
              v-for="item in interests"
              :key="item"
              class="flex gap-2.5 text-[15px] leading-relaxed text-zinc-300"
            >
              <span class="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#6c5ce7]" />
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="rounded-xl border border-white/10 bg-[#101018] p-6">
          <h3 class="mb-4 text-base font-semibold text-white">
            Focus areas
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in tags"
              :key="tag"
              class="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-zinc-400"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
