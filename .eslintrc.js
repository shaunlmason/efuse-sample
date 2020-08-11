module.exports = {
    root: true,
    extends: ['airbnb-typescript', 'prettier', 'prettier/@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        project: './tsconfig.json'
    }
};
