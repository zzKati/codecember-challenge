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