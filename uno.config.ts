import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons({
    scale: 1.2,
    prefix: 'i-',
  })],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
