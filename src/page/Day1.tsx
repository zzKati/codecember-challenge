import { defineComponent, onMounted, ref } from 'vue'
import p5 from 'p5'
import { isDark } from '../composables/dark'



export default defineComponent({
  name: 'Day1',
  setup() {
    const canvasRef = ref<HTMLCanvasElement>()
    const width = 300
    const height = width
    const length = 8
    const margin = 10
    const strokeWidth = 2
    const cols = getNoOfCols(width,length,margin) - 1 // 多算了一个
    const rows = getNoOfRows(height,strokeWidth,margin) - 1 // 多算了一个

    function getNoOfCols(w:number,length:number,margin:number){
      let totalLength = 0
      let count = 0

      while(totalLength < w){
        totalLength += length + margin
        count++
      }
      return count
    }

    function getNoOfRows(h:number,strokeWidth:number,margin:number){
      return getNoOfCols(h,strokeWidth,margin)
    }

    onMounted(()=>{
      new p5((p:p5)=>{
        p.setup = ()=>{
          p.createCanvas(width,height)
          p.draw = ()=>{
            p.background(isDark.value ? "#121212" : "#ffffff")

            for(let i = 0; i < rows; i++){
              for(let j = 0; j < cols;j++){
                const currentOffset = {
                  x:j * length + (j+1) * margin,
                  y:(i+1) * margin + (i * strokeWidth) + strokeWidth,
                }

                const delta = {
                  x: currentOffset.x - length / 2 - margin/ 2 - p.mouseX,
                  y: currentOffset.y - p.mouseY
                } // 得到 当前点 到 鼠标点的 向量(有正负 代表方向)
              
                const theta = Math.atan2(delta.y,delta.x) // 计算出 当前点 到 鼠标点的 向量 与 水平线的夹角
                const deltaThreshold = 40

                p.strokeWeight(strokeWidth)
                p.stroke(100)
                
                if(Math.abs(delta.x) < deltaThreshold && Math.abs(delta.y) < deltaThreshold) {
                  var amt = (Math.abs(delta.x) + Math.abs(delta.y)) / 2;
                  var amtMapped = p.map(amt, 0, deltaThreshold, -50, 255);
                  p.stroke(100, amtMapped)
                }
                
                p.push()
        
                p.translate(currentOffset.x, currentOffset.y);
                p.rotate(theta);
                
                p.line(0, 0, 0 + length, 0);
                p.pop();
        
                p.fill(250, 150, 0);
                p.noStroke();
              
                
             }
            }
          }
        }
      },canvasRef.value)
    })
    return () => (
      <div class="flex-1 w-full flex justify-center items-center ">
        <div ref={canvasRef} ></div>
      </div>
    )
  },
})
