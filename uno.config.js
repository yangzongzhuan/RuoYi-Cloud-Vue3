import { defineConfig, presetUno, presetIcons } from 'unocss'



// https://quanyi.blog.csdn.net/article/details/135680388
export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      warn: true,
      extraProperties: {
        display: 'inline-block',
      },
    }),
  ]
})
