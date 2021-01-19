export default {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    mode: 'universal',
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'static',
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content:'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi, viewport-fit=cover'  },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [ 
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [
        '~/plugins/axios',
        '~/plugins/axiosAuth',
        
    ],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        // '@nuxtjs/eslint-module',
        // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
        '@nuxtjs/tailwindcss',
        
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@aceforth/nuxt-optimized-images',
        'nuxt-lazy-load',
        '@nuxtjs/auth',
        '@nuxtjs/pwa', [
            '@nuxtjs/firebase',
            {
                config: {
                    apiKey: "AIzaSyDcUUn0uLlPIvVgBVO9fBafShjOeOPvU5k",
                    authDomain: "mundo-juguetilandia-50db6.firebaseapp.com",
                    databaseURL: "https://mundo-juguetilandia-50db6.firebaseio.com",
                    projectId: "mundo-juguetilandia-50db6",
                    storageBucket: "mundo-juguetilandia-50db6.appspot.com",
                    messagingSenderId: "678472501618",
                    appId: "1:678472501618:web:451eb759130b15e60df5eb",
                    measurementId: "G-E1SR9ZGQ71"

                },
                services: {
                    analytics: {
                        collectionEnabled: true // default
                    }
                }
            }
        ]
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    build: {
        transpile: [
            'three'
        ]
    }
}