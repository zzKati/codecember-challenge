import { defineComponent, onMounted, ref } from 'vue'
import { initCanvas, random, randomShade } from '../utils'

interface Circle {
  x: number
  y: number
  radius: number
}

export default defineComponent({
  name: 'Day10',
  setup() {
    const canvasRef = ref<HTMLCanvasElement>()
    const width = 500
    const height = width
    const minRadius = 4
    const maxRadius = 100
    const total = 300
    const triesTimes = 500
    const circles = ref<Circle[]>([])
    const ctxRef = ref<CanvasRenderingContext2D>()

    onMounted(() => {
      const ctx = initCanvas(canvasRef.value!, width, height)
      ctxRef.value = ctx
      ctx.lineWidth = 1.5
      draw(ctx) 
    })

    function draw(ctx:CanvasRenderingContext2D){
      const hue = random(0,360)
      ctx.clearRect(0,0,width,height)
      circles.value = []
      function createAndDrawCircle() {
        let newCircle:Circle
        let canCreate = false
        for(let tries = 0;tries < triesTimes; tries++){
          newCircle = {
            x:Math.floor(random(0, width)),
            y:Math.floor(random(0, height)),
            radius: minRadius,
          }

          if(isCollision(newCircle)) continue
          else {
            canCreate = true
            break
          }
        }
        
        if(!canCreate) return
        
        const circle = newCircle!

        while(!isCollision(circle) && circle.radius <= maxRadius) circle.radius++
        circle.radius--

        circles.value.push(circle)
        ctx.beginPath()
        const color = randomShade(hue)
        ctx.fillStyle = color.replace("1.0","0.5")
        ctx.strokeStyle = color
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      }

      function isCollision(circle: Circle) {
        for (const c of circles.value) {
          const radii = circle.radius + c.radius
          const x = circle.x - c.x
          const y = circle.y - c.y
          if (Math.sqrt(x * x + y * y) < radii) {
            return true
          }    
        }

        if(circle.x + circle.radius >= width || circle.x - circle.radius <= 0 || circle.y + circle.radius >= height || circle.y - circle.radius <= 0 ) return true

        return false
      }

      for (let i = 0; i < total; i++) {
        createAndDrawCircle()
      }
    }


    return () => <canvas class=" cursor-pointer" onClick={()=>draw(ctxRef.value!)} ref={canvasRef} />
  },
})
