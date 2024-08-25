import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2, // 2, or 'tab'
    quotes: 'single', // or 'double'
  },
  rules: {
    'style/comma-dangle': 'off'
  },
  ignores: [
    '.vscode',
    'build/',
    'src/assets/',
    'public/',
    'dist/',
    'node_modules/',
    'pnpm-lock.yaml',
    '**/*.d.ts',
  ],
})
