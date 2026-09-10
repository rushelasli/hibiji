<script setup lang="ts">
import { ref } from 'vue'
import { useScrollSpy } from '@/composables/useScrollSpy'
import Button from '@/components/ui/button.vue'
import Sheet from '@/components/ui/sheet.vue'
import { Menu, Home, User, Zap, Wrench, Rocket, FileText, Mail } from 'lucide-vue-next'

const sectionIds = ['home', 'about', 'projects', 'skills', 'experience', 'itsme', 'contact']
const { activeId, scrollTo } = useScrollSpy(sectionIds, 100)

const sheetOpen = ref(false)

const navItemsLeft = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Zap },
  { id: 'skills', label: 'Skills', icon: Wrench },
]

const navItemsRight = [
  { id: 'experience', label: 'Experience', icon: Rocket },
  { id: 'itsme', label: 'Its Me', icon: FileText },
  { id: 'contact', label: 'Contact', icon: Mail },
]

const allNavItems = [...navItemsLeft, ...navItemsRight]

function handleNavClick(id: string) {
  scrollTo(id)
  sheetOpen.value = false
}

function isActive(id: string) {
  return activeId.value === id
}
</script>

<template>
  <nav class="sticky top-0 z-50 flex items-center justify-between gap-4 bg-[#050512]/95 px-4 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.5)] backdrop-blur-sm md:px-8 lg:px-12">
    <!-- Desktop left links -->
    <div class="hidden items-center gap-5 lg:flex">
      <a
        v-for="item in navItemsLeft"
        :key="item.id"
        :href="`#${item.id}`"
        :class="[
          'inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-white',
          isActive(item.id) ? 'text-white' : 'text-[#b2bec3]',
        ]"
        @click.prevent="handleNavClick(item.id)"
      >
        <component :is="item.icon" class="size-4 shrink-0" />
        {{ item.label }}
      </a>
    </div>

    <!-- Logo -->
    <div class="text-lg font-bold text-[#6c5ce7] shrink-0">
      Ulil Albab
    </div>

    <!-- Desktop right links -->
    <div class="hidden items-center gap-5 lg:flex">
      <a
        v-for="item in navItemsRight"
        :key="item.id"
        :href="`#${item.id}`"
        :class="[
          'inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-white',
          isActive(item.id) ? 'text-white' : 'text-[#b2bec3]',
        ]"
        @click.prevent="handleNavClick(item.id)"
      >
        <component :is="item.icon" class="size-4 shrink-0" />
        {{ item.label }}
      </a>
    </div>

    <!-- Tablet: all links inline but still visible between md and lg -->
    <div class="hidden items-center gap-4 md:flex lg:hidden">
      <a
        v-for="item in allNavItems"
        :key="item.id"
        :href="`#${item.id}`"
        :class="[
          'inline-flex items-center gap-1 text-xs font-medium transition-colors hover:text-white whitespace-nowrap',
          isActive(item.id) ? 'text-white' : 'text-[#b2bec3]',
        ]"
        @click.prevent="handleNavClick(item.id)"
      >
        <component :is="item.icon" class="size-3.5 shrink-0" />
        {{ item.label }}
      </a>
    </div>

    <!-- Mobile hamburger -->
    <Button
      variant="ghost"
      size="icon"
      class="md:hidden text-white hover:bg-white/10 hover:text-white"
      aria-label="Open navigation menu"
      @click="sheetOpen = true"
    >
      <Menu class="h-5 w-5" />
    </Button>
  </nav>

  <!-- Mobile Sheet -->
  <Sheet :open="sheetOpen" side="left" class="bg-[#0d0d1a] border-[#1e1e30] text-white" @update:open="sheetOpen = $event">
    <template #default="{ close }">
      <div class="flex flex-col gap-6 pt-8">
        <div class="text-lg font-bold text-[#6c5ce7]">Ulil Albab</div>
        <nav class="flex flex-col gap-1">
          <a
            v-for="item in allNavItems"
            :key="item.id"
            :href="`#${item.id}`"
            :class="[
              'inline-flex items-center gap-2 rounded-md px-3 py-3 text-sm font-medium transition-colors',
              isActive(item.id) ? 'bg-[#6c5ce7] text-white' : 'text-[#b2bec3] hover:bg-white/10 hover:text-white',
            ]"
            @click.prevent="() => { handleNavClick(item.id); close() }"
          >
            <component :is="item.icon" class="size-4 shrink-0" />
            {{ item.label }}
          </a>
        </nav>
      </div>
    </template>
  </Sheet>
</template>
