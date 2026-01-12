import P5 from 'p5'
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { isDark } from '../composables/dark'

export default defineComponent({
  name: 'Test',
  setup() {
    const canvasRef = ref<HTMLDivElement>()
    const P5Ref = ref<P5>()
    const width = 500
    const height = 500
    const length = 10
    const margin = 10
    const col = getCols(width, length, margin)
    const strokeWidth = 2
    const rows = col

    function getCols(w: number, length: number, margin: number) {
      let totalLength = 0
      let count = 0
      while (totalLength < w) {
        totalLength += length + margin
        count++
      }
      return count - 1
    }

    onMounted(() => {
      P5Ref.value = new P5((p: P5) => {
        p.setup = () => {
          p.createCanvas(width, height)
          p.draw = () => {
            p.background(isDark.value ? '#121212' : '#ffffff')
            p.stroke(100)
            p.strokeWeight(strokeWidth)
            for (let i = 0; i < rows; i++) {
              for (let j = 0; j < rows; j++) {
                const currentOffset = {
                  x: j * length + (j + 1) * margin,
                  y: (i + 1) * length + (i + 1) * margin,
                }

                const delta = {
                  x: currentOffset.x - p.mouseX,
                  y: currentOffset.y - p.mouseY,
                }

                const theta = Math.atan2(delta.y, delta.x)

                p.push()
                p.translate(currentOffset.x, currentOffset.y)
                p.rotate(theta)
                p.line(0, 0, length, 0)
                p.pop()
              }
            }
          }
        }
      }, canvasRef.value)
    })

    onUnmounted(()=>{
      console.log("remove execute")
      P5Ref.value?.remove()
    })

    return () => <div ref={canvasRef} />
  },
})
