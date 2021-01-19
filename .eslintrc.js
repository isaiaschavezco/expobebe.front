module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended'
    ],
    plugins: [],
    // add your custom rules here
    rules: {
        "no-console": false,
        "vue/html-indent": false,
        "space-before-function-paren": false
    }
}