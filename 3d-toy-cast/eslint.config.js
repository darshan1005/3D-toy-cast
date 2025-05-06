import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'

export default tseslint.config({
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
    import: importPlugin,
    'jsx-a11y': jsxA11y,
    prettier: prettier,
  },
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error', // Enforce Prettier formatting
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
  },
})
