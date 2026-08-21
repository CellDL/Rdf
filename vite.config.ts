import path from 'node:path'
import url from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const _dirname = path.dirname(url.fileURLToPath(import.meta.url))

export default defineConfig({
    build: {
        lib: {
            entry: './index.ts',
            fileName: (format: string) => `Rdf.${format}.js`,
            formats: ['es'],
            name: 'Rdf'
        },
        rollupOptions: {
            output: {
                dir: 'dist',
                exports: 'named'
            }
        },
        sourcemap: true,
        target: 'esnext'
    },
    optimizeDeps: {
        exclude: [
            '*.wasm'
        ]
    },
    plugins: [
        dts({
            exclude: ['vite.config.ts'],
            insertTypesEntry: true
        })
    ],
    resolve: {
        alias: {
            '@oxigraph': path.resolve(_dirname, 'src/assets/oxigraph')
        }
    }
})
