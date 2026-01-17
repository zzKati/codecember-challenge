export function initCanvas(canvas: HTMLCanvasElement,width:number,height:number) {
  const ctx = canvas.getContext('2d')!
  const ratio = window.devicePixelRatio || 1
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = width * ratio
  canvas.height = height * ratio
  ctx.scale(ratio, ratio)
  return ctx
}

export function random(min:number,max:number){
  return Math.random() * (max - min) + min
}


/**
 * generate a hsl color with standard hue, saturation, and lightness
 * @param {number} hue 0-360
 * @param {number} saturation 0-100
 * @param {number} lightness 0-100
 * @returns {string} a hsl color string
 */
export const randomShade = (hue:number,saturation:number = random(50,100),lightness:number = random(20,80)) => `hsl(${hue}, ${saturation}%, ${lightness}%)`
