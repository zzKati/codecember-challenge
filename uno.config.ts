import { defineConfig, presetAttributify, presetIcons, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [presetWind4(), presetAttributify(), presetIcons({
    scale: 1.2,
    prefix: 'i-',
  })],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
