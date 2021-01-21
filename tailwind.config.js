/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
    theme: {
        // colors: {
        //   redjugueti: {
        //     lighter: '#fa024b',
        //     default: '#EB0045',
        //     dark: '#d1003d'
        //   }
        // }
        extend: {
            colors: {
                redjugueti: {
                    lighter: "#fa024b",
                    default: "#EB0045",
                    dark: "#d1003d"
                },
                bluenewborn: {
                    default: "rgb(218, 144, 161)"
                },
                under: {
                    default: "rgb(168, 168, 202)"
                },
                pregned: {
                    default: " rgb(147, 203, 228)"
                },
                graycorp: {
                    default: "#707070"
                },
                aquajugueti: {
                    default: "#3CB4E5"
                },
                geenjugueti: {
                    default: "#58B149"
                },
                yellowcorp: {
                    default: "#FFB71B"
                }
            },
            fontFamily: {
                maryd: ["Myriad Pro", "Helvetica", "Arial"],
                bogle: ["Bogle", "Helvetica", "Arial"]
            },
            height: {
                "96": "24rem",
                "112": "28rem",
                "80": "80vh"
            },
            padding: {
                "168": "42rem",
                "144": "36rem"
            },
            inset: {
                "-4": "-1rem",
                "4": "1rem",
                "16": "4rem"
            },
            screens: {
                landscape: { raw: "(orientation: landscape)" },
                portrait: { raw: "(orientation: portrait)" }
            }
        }
    },
    variants: {},
    plugins: [],
    purge: {
        // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
        enabled: process.env.NODE_ENV === "production",
        content: [
            "components/**/*.vue",
            "layouts/**/*.vue",
            "pages/**/*.vue",
            "plugins/**/*.js",
            "nuxt.config.js"
        ]
    }
};