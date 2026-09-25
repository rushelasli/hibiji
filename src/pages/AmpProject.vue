<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AmpHero from '@/components/amp/AmpHero.vue'
import AmpAbout from '@/components/amp/AmpAbout.vue'
import BlockDiagramSection from '@/components/amp/BlockDiagramSection.vue'
import Amp3DSection from '@/components/amp/Amp3DSection.vue'
import AmpMeasurementSection from '@/components/amp/AmpMeasurementSection.vue'
import AmpReferences from '@/components/amp/AmpReferences.vue'

interface BlockItem {
  title: string
  desc: string
}

const { tm } = useI18n()

const ampBlocks = computed(() => tm('amp.ampBlocks') as unknown as BlockItem[])
const psuBlocks = computed(() => tm('amp.psuBlocks') as unknown as BlockItem[])
</script>

<template>
  <main>
    <AmpHero />
    <AmpAbout />

    <BlockDiagramSection
      eyebrow-key="amp.topologyEyebrow"
      title-key="amp.topologyTitle"
      image="/projects/amp/TopologiAmp.png"
      alt-key="amp.topologyAlt"
      :blocks="ampBlocks"
    />

    <BlockDiagramSection
      eyebrow-key="amp.psuEyebrow"
      title-key="amp.psuTitle"
      image="/projects/amp/BlockSupply.png"
      alt-key="amp.psuAlt"
      :blocks="psuBlocks"
    />

    <Amp3DSection />
    <AmpMeasurementSection />
    <AmpReferences />
  </main>
</template>
