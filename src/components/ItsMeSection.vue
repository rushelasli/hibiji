<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import Card from '@/components/ui/card.vue'
import Table from '@/components/ui/table.vue'
import { Lightbulb } from 'lucide-vue-next'
import TableHeader from '@/components/ui/table-header.vue'
import TableBody from '@/components/ui/table-body.vue'
import TableRow from '@/components/ui/table-row.vue'
import TableHead from '@/components/ui/table-head.vue'
import TableCell from '@/components/ui/table-cell.vue'

Chart.register(...registerables)

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const traits = [
  { label: 'Ekstrovert 51%', value: 51, meaning: 'Kamu sedikit lebih sosial dan terbuka, tapi tidak terlalu berlebihan.' },
  { label: 'Visioner 51%', value: 51, meaning: 'Kemampuan melihat ide dan masa depan agak di atas rata-rata.' },
  { label: 'Rasional 57%', value: 57, meaning: 'Kamu cenderung logis, berpikir dengan fakta dan analisis.' },
  { label: 'Improvisasi 53%', value: 53, meaning: 'Kemampuan menyesuaikan diri dan menciptakan solusi spontan cukup baik.' },
  { label: 'Waspada 67%', value: 67, meaning: 'Kamu cukup berhati-hati, cepat menangkap potensi risiko.' },
]

onMounted(() => {
  if (!canvasRef.value) return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  chartInstance = new Chart(ctx as any, {
    type: 'line',
    data: {
      labels: ['Ekstrovert', 'Visioner', 'Rasional', 'Improvisasi', 'Waspada'],
      datasets: [
        {
          label: 'Persentase Kepribadian',
          data: [51, 51, 57, 53, 67],
          fill: false,
          borderColor: '#6c5ce7',
          backgroundColor: '#6c5ce7',
          tension: 0.4,
          pointRadius: 8,
          pointBackgroundColor: '#e84393',
        } as any,
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          titleFont: { size: 14 },
          bodyFont: { size: 13 },
          callbacks: {
            label: (context: any) => `${context.parsed.y}%`,
          },
        },
      },
      scales: {
        x: {
          ticks: { color: '#ffffff', font: { size: 11, weight: 'bold' } as any },
          grid: { color: 'rgba(255,255,255,0.08)' },
        },
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: '#ffffff',
            font: { size: 11, weight: 'bold' } as any,
            callback: (value: any) => `${value}%`,
          },
          grid: { color: 'rgba(255,255,255,0.08)' },
        },
      },
    } as any,
  })
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})
</script>

<template>
  <section id="itsme" class="bg-[#24246bc9] px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
    <div class="mx-auto flex max-w-[1000px] flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
      <!-- Chart -->
      <div class="w-full flex-1 min-w-0">
        <h2 class="mb-6 inline-flex items-center gap-2 font-pixel text-base leading-relaxed text-[#6c5ce7] md:text-lg">
          <Lightbulb class="size-6 shrink-0 text-[#6c5ce7]" /> It's Me
        </h2>
        <Card class="overflow-hidden border-none bg-[#0d0d1a] p-4 shadow-[0_10px_20px_rgba(0,0,0,0.3)] md:p-5">
          <div class="relative h-[280px] w-full sm:h-[320px]">
            <canvas ref="canvasRef" class="h-full !w-full" />
          </div>
        </Card>
      </div>

      <!-- Table -->
      <div class="w-full flex-1 min-w-0">
        <!-- spacer to align with chart heading on desktop -->
        <div class="hidden h-[28px] lg:block mb-6" />
        <Card class="border-none bg-[#0d0d1a] p-0 shadow-[0_10px_20px_rgba(0,0,0,0.3)] overflow-hidden">
          <div class="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow class="border-[#6c5ce7]/30 hover:bg-transparent">
                  <TableHead class="text-[#6c5ce7] text-xs md:text-sm whitespace-nowrap">Label</TableHead>
                  <TableHead class="text-center text-[#6c5ce7] text-xs md:text-sm">Nilai</TableHead>
                  <TableHead class="text-[#6c5ce7] text-xs md:text-sm min-w-[180px]">Arti singkat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  v-for="t in traits"
                  :key="t.label"
                  class="border-white/10 hover:bg-white/[0.03]"
                >
                  <TableCell class="text-xs md:text-sm whitespace-nowrap font-medium text-white py-3">{{ t.label }}</TableCell>
                  <TableCell class="text-center text-xs md:text-sm text-white py-3">{{ t.value }}</TableCell>
                  <TableCell class="text-xs md:text-sm text-[#b2bec3] leading-relaxed py-3">{{ t.meaning }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>
