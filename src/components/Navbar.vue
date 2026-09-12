<script setup lang="ts">
import { ref } from 'vue'
import { useScrollSpy } from '@/composables/useScrollSpy'
import Button from '@/components/ui/button.vue'
import Sheet from '@/components/ui/sheet.vue'
import { Menu } from 'lucide-vue-next'

const sectionIds = ['home', 'about', 'projects', 'skills', 'experience', 'contact']
const { activeId, scrollTo } = useScrollSpy(sectionIds, 100)

const sheetOpen = ref(false)

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

function handleNavClick(id: string) {
  scrollTo(id)
  sheetOpen.value = false
}

function isActive(id: string) {
  return activeId.value === id
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-white/10 bg-[#09090f]/90 backdrop-blur"
  >
    <nav class="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 md:px-8">
      <button
        class="font-mono text-lg font-bold tracking-wider text-white"
        @click="handleNavClick('home')"
      >
        ULIL ALBAB<span class="text-[#6c5ce7]">.</span>
      </button>

      <!-- Desktop links -->
      <div class="hidden items-center gap-1 md:flex">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          :class="[
            'rounded-md px-3 py-2 text-sm transition-colors',
            isActive(item.id)
              ? 'text-white'
              : 'text-zinc-400 hover:bg-white/5 hover:text-white',
          ]"
          @click.prevent="handleNavClick(item.id)"
        >
          {{ item.label }}
        </a>
      </div>

      <!-- Mobile hamburger -->
      <Button
        variant="ghost"
        size="icon"
        class="text-zinc-300 hover:bg-white/10 hover:text-white md:hidden"
        aria-label="Open navigation menu"
        @click="sheetOpen = true"
      >
        <Menu class="h-5 w-5" />
      </Button>
    </nav>
  </header>

  <!-- Mobile sheet -->
  <Sheet
    :open="sheetOpen"
    side="right"
    class="border-white/10 bg-[#101018] text-white"
    @update:open="sheetOpen = $event"
  >
    <template #default="{ close }">
      <div class="flex flex-col gap-6 pt-10">
        <div class="font-mono text-lg font-bold tracking-wider text-white">
          ULIL ALBAB<span class="text-[#6c5ce7]">.</span>
        </div>
        <nav class="flex flex-col gap-1">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            :class="[
              'rounded-md px-3 py-3 text-[15px] transition-colors',
              isActive(item.id)
                ? 'bg-white/10 text-white'
                : 'text-zinc-400 hover:bg-white/5 hover:text-white',
            ]"
            @click.prevent="() => { handleNavClick(item.id); close() }"
          >
            {{ item.label }}
          </a>
        </nav>
      </div>
    </template>
  </Sheet>
</template>
