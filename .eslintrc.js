module.exports = {
    'plugins': [
        '@stylistic/js'
    ],
    'env': {
        'node': true,
        'commonjs': true,
        'es2021': true
    },
    'extends': 'eslint:recommended',
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        '@stylistic/js/indent': ['error', 4],
        'no-console': 'off',
        '@stylistic/js/quotes': ['error', 'single'],
        '@stylistic/js/linebreak-style': ['error', 'unix'],
        '@stylistic/js/semi': ['error', 'always'],
        '@stylistic/js/no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'no-unused-vars': 'off',
    }
};
