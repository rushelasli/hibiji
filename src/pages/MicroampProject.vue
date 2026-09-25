<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectHero from '@/components/project/ProjectHero.vue'
import ProjectAbout from '@/components/project/ProjectAbout.vue'
import ProjectTextSection from '@/components/project/ProjectTextSection.vue'
import BlockDiagramSection from '@/components/project/BlockDiagramSection.vue'
import Project3DSection from '@/components/project/Project3DSection.vue'
import ProjectMeasurementSection from '@/components/project/ProjectMeasurementSection.vue'
import ProjectReferences from '@/components/project/ProjectReferences.vue'

interface BlockItem {
  title: string
  desc: string
}

const { tm } = useI18n()

const microAmpBlocks = computed(() => tm('microamp.ampBlocks') as unknown as BlockItem[])
const microPsuBlocks = computed(() => tm('microamp.psuBlocks') as unknown as BlockItem[])

// The MicroHibi origin site references these files by the amp project's
// filenames — we serve the amp project's local copies (assets are identical).
const infoParagraphs = [
  'microamp.infoP1',
  'microamp.infoP2',
  'microamp.infoP3',
  'microamp.infoP4',
]
</script>

<template>
  <main>
    <ProjectHero ns="microamp" />
    <ProjectAbout ns="microamp" image="/projects/microamp/maskot.jpg" />

    <ProjectTextSection
      eyebrow-key="microamp.infoEyebrow"
      title-key="microamp.infoTitle"
      :paragraph-keys="infoParagraphs"
    />

    <BlockDiagramSection
      eyebrow-key="microamp.topologyEyebrow"
      title-key="microamp.topologyTitle"
      image="/projects/amp/TopologiAmp.png"
      alt-key="microamp.topologyAlt"
      :blocks="microAmpBlocks"
    />

    <BlockDiagramSection
      eyebrow-key="microamp.psuEyebrow"
      title-key="microamp.psuTitle"
      image="/projects/amp/BlockSupply.png"
      alt-key="microamp.psuAlt"
      :blocks="microPsuBlocks"
    />

    <Project3DSection ns="microamp" />
    <ProjectMeasurementSection ns="microamp" />
    <ProjectReferences ns="microamp" />
  </main>
</template>
