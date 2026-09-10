import { ref, onMounted, onUnmounted } from 'vue'

const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

function formatNow(): string {
  const now = new Date()
  const dayName = days[now.getDay()]
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  return `${dayName}, ${h}:${m}:${s}`
}

export function useServerTime() {
  const time = ref(formatNow())
  let timer: number | undefined

  onMounted(() => {
    timer = window.setInterval(() => {
      time.value = formatNow()
    }, 1000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return { time }
}
