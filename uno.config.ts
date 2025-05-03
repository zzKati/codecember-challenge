import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [presetAttributify(), presetIcons({
    scale: 1.2,
  }), presetTypography(), presetUno()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
