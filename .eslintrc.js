module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'
      ], // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  extends: ['taro/react', 'wkts/loose', 'wktaro/loose', 'plugin:react/recommended'
  ],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'import/no-commonjs': 'off',
    'no-case-declarations': 'off',
  },
};
