module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'react-refresh'
  ],
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // TypeScript rules
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off', // Allow any for now

    // React rules
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react-refresh/only-export-components': 'off', // Allow mixed exports in context files

    // General rules
    'no-console': 'off',
    'no-empty': 'warn', // Make empty blocks a warning instead of error
  },
  ignorePatterns: [
    'dist',
    'build',
    'node_modules',
    '.eslintrc.cjs',
    '**/*.js', // Ignore JS files in TS project
    '**/routeTree.gen.ts', // Ignore TanStack Router generated files
    '**/*.gen.ts' // Ignore all generated TypeScript files
  ],
}