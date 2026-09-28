<script setup lang="ts">
import FuruHero from '@/components/furuhibi/FuruHero.vue'
import FuruProducts from '@/components/furuhibi/FuruProducts.vue'
import FuruEcosystem from '@/components/furuhibi/FuruEcosystem.vue'
import FuruDspBand from '@/components/furuhibi/FuruDspBand.vue'
import FuruDownloads from '@/components/furuhibi/FuruDownloads.vue'
import FuruPhilosophy from '@/components/furuhibi/FuruPhilosophy.vue'
import FuruArchitecture from '@/components/furuhibi/FuruArchitecture.vue'
import FuruUpdates from '@/components/furuhibi/FuruUpdates.vue'
import FuruAbout from '@/components/furuhibi/FuruAbout.vue'

/** Set by the projects hub (no router); when omitted, falls back to a router link. */
defineProps<{ backHref?: string }>()
</script>

<template>
  <main>
    <FuruHero :back-href="backHref" />
    <FuruProducts />
    <FuruEcosystem />
    <FuruDspBand />
    <FuruDownloads />
    <FuruPhilosophy />
    <FuruArchitecture />
    <FuruUpdates />
    <FuruAbout />
  </main>
</template>
