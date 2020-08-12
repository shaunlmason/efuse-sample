module.exports = {
    root: true,
    extends: ['airbnb-typescript/base', 'prettier', 'prettier/@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        '@typescript-eslint/lines-between-class-members': 'off',
        'global-require': 'off',
        'import/prefer-default-export': 'off',
        'no-console': 'off',
        'no-underscore-dangle': 'off',
        'prefer-destructuring': 'off'
    }
};
