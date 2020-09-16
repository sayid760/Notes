import babel from 'rollup-plugin-babel'

let babelConfig = {
    "presets": [
        [
            "env", {
                "modules": false,
                "targets": {
                    "browsers": ["chrome > 40", "safari >= 7"]
                }
            }
        ]
    ]
}

let isDev = process.env.NODE_ENV === 'develop'
const path = require('path')
export default {
    input: 'index.js',
    watch: {
        exclude: 'node_modules/**'
    },
    output: {
        file: isDev ? path.resolve(__dirname, '../website/client/js/eagle-monitor/bundle.umd.js') : path.resolve(__dirname, '../dist/boundle.umd.js'),
        name: 'EagleMonitor',
        format: 'umd',
        sourcemap: true
    },
    plugin: [
        babel({
            babelrc: false,
            presets: babelConfig.presets,
            plugins: babelConfig.plugins,
            exclude: 'node_modules/**'
        })
    ]
}