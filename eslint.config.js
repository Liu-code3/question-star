import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: {
    overrides: {
      'ts/no-unused-expressions': ['error', { allowTernary: true }]
    }
  },
  formatters: true,
  unocss: true,
  stylistic: {
    indent: 2, // 2, or 'tab'
    quotes: 'single', // or 'double'
  },
  rules: {
    'style/comma-dangle': 'off',
    'no-console': 'warn',
    // 'ts/no-unused-expressions': 'off'
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
