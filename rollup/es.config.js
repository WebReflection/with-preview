import resolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

export default {
  input: './esm/index.js',
  plugins: [
    
    resolve({module: true}),
    terser()
  ],
  
  output: {
    exports: 'named',
    file: './es.js',
    format: 'iife',
    name: 'imgPreview'
  }
};
