<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let stars: Star[] = []
let spawnInterval: number | null = null

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

class Star {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  trailLength: number
  history: { x: number; y: number }[]
  canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.x = random(0, canvas.width)
    this.y = random(0, 50)
    this.size = random(1, 3)
    this.speedY = random(1, 4)
    this.speedX = -this.speedY * random(0.3, 1)
    this.trailLength = Math.floor(10 + ((this.speedY - 1) / 3) * 70)
    this.history = []
  }

  update(): boolean {
    this.x += this.speedX
    this.y += this.speedY
    this.history.push({ x: this.x, y: this.y })
    if (this.history.length > this.trailLength) this.history.shift()
    if (this.y > this.canvas.height || this.x < -50) return false
    return true
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.history.length; i++) {
      const alpha = ((i + 1) / this.history.length) * 0.5
      ctx.fillStyle = `rgba(255,255,255,${alpha})`
      ctx.beginPath()
      ctx.arc(this.history[i].x, this.history[i].y, this.size * 0.6, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const parent = canvas.parentElement
  if (!parent) return
  canvas.width = parent.offsetWidth
  canvas.height = parent.offsetHeight
}

function spawnStar() {
  const canvas = canvasRef.value
  if (!canvas) return
  stars.push(new Star(canvas))
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  stars = stars.filter((s) => s.update())
  stars.forEach((s) => s.draw(ctx))
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  spawnInterval = window.setInterval(spawnStar, 120)
  animate()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  if (animationId) cancelAnimationFrame(animationId)
  if (spawnInterval) clearInterval(spawnInterval)
})
</script>

<template>
  <canvas ref="canvasRef" class="absolute inset-0 h-full w-full pointer-events-none" />
</template>
