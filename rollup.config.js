import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'Table',
    entry: 'src/index.js',
    dest: 'dist/table.js',
    format: 'iife',
    sourceMap: true,
    plugins: [
        babel()
    ]
};