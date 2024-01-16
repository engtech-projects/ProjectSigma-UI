// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: { enabled: true },

    modules: [
        [
            "@nuxtjs/eslint-module",
            {
                formatter: "stylish",
                failOnError: true,
                lintOnStart: false,
                fix: false // change to true when you want to auto fix eslint errors
            },
        ],
        "@nuxtjs/tailwindcss",
        "@samk-dev/nuxt-vcalendar",
        "nuxt-icon",
        [
            "@pinia/nuxt",
            {
                autoImports: ["defineStore", "acceptHMRUpdate"],
            },
        ],
        "@pinia-plugin-persistedstate/nuxt",
        "@sidebase/nuxt-auth",
    ],

    imports: {
        dirs: ["stores"],
    },

    auth: {
        globalAppMiddleware: {
            isEnabled: true,
        },
        baseURL: process.env.HRMS_API_URL + "/api",
        provider: {
            type: "local",
            endpoints: {
                signIn: { path: "/login", method: "post" },
                signOut: { path: "/logout", method: "post" },
                // signUp: { path: '/register', method: 'post' },
                getSession: { path: "/session", method: "get" },
            },
            token: {
                signInResponseTokenPointer: "/access_token",
                maxAgeInSeconds: 9999999,
            },
            pages: {
                login: "/"
            },
        },
        session: {
            enableRefreshOnWindowFocus: false,
            enableRefreshPeriodically: false,
        },

    },

    runtimeConfig: {
        public: {
            HRMS_API_URL: process.env.HRMS_API_URL,
            ACCOUNTING_API_URL: process.env.ACCOUNTING_API_URL,
            INVENTORY_API_URL: process.env.INVENTORY_API_URL,
            PROJECT_API_URL: process.env.PROJECT_API_URL,
        }
    },

    build: {
        transpile: ["@vuepic/vue-datepicker"]
    },
})
