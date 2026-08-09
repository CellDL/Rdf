import path from 'node:path'
import url from 'node:url'
import { defineConfig } from 'vite'
import typescript from "@rollup/plugin-typescript"

const _dirname = path.dirname(url.fileURLToPath(import.meta.url))

export default defineConfig({
    build: {
        lib: {
            entry: './index.ts',
            fileName: (format: string) => `RdfStore.${format}.js`,
            formats: ['es'],
            name: 'RdfStore'
        },
        rollupOptions: {
            output: {
                dir: 'dist',
                exports: 'named'
            },
            plugins: [
                typescript({
                    include: [
                        './index.ts',
                        'src/**'
                    ]
                }),
            ]
        },
        sourcemap: true,
        target: 'esnext'
    },
    optimizeDeps: {
        esbuildOptions: {
            target: 'esnext'
        },
        exclude: [
            '*.wasm'
        ]
    },
    resolve: {
        alias: {
            '@oxigraph': path.resolve(_dirname, 'src/assets/oxigraph')
        }
    }
})
