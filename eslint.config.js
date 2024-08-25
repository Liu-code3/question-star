import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: true,
  formatters: true,
  unocss: true,
  stylistic: {
    indent: 2, // 2, or 'tab'
    quotes: 'single', // or 'double'
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
