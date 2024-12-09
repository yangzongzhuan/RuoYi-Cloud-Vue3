import vue from '@vitejs/plugin-vue'
import createUnocss from './unocss.js'
import createAutoImport from './auto-import'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createSetupExtend from './setup-extend'

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [
        vue(),
        createAutoImport(),
        createSetupExtend(),
        createSvgIcon(isBuild),
        createUnocss(),
       
    ]
	isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}
