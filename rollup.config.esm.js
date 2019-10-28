import buble from 'rollup-plugin-buble';

export default {
  input: 'src/chess-functions.js',
  output: {
    file: 'dist/chess-functions.esm.js',
    format: 'esm',
    name: 'Chess'
  },
  plugins: [ buble({transforms: { dangerousForOf: true}, objectAssign: Object.assign}) ]
};
