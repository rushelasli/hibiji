<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectHero from '@/components/project/ProjectHero.vue'
import ProjectAbout from '@/components/project/ProjectAbout.vue'
import BlockDiagramSection from '@/components/project/BlockDiagramSection.vue'
import Project3DSection from '@/components/project/Project3DSection.vue'
import ProjectMeasurementSection from '@/components/project/ProjectMeasurementSection.vue'
import ProjectReferences from '@/components/project/ProjectReferences.vue'

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
    <ProjectHero />
    <ProjectAbout />

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

    <Project3DSection />
    <ProjectMeasurementSection />
    <ProjectReferences />
  </main>
</template>
