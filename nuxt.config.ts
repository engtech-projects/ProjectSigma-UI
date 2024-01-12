// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@samk-dev/nuxt-vcalendar',
    'nuxt-icon',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    '@pinia-plugin-persistedstate/nuxt',
    '@sidebase/nuxt-auth',
  ],

  imports: {
    dirs: ['stores'],
  },


  auth: {
    globalAppMiddleware: {
        isEnabled: false,
    },
    baseURL: process.env.HRMS_API_URL,
    provider: {
        type: "local",
        endpoints: {
            signIn: { path: "/api/login", method: "post" },
            signOut: { path: "/api/logout", method: "post" },
            // signUp: { path: '/register', method: 'post' },
            getSession: { path: "/api/users", method: "get" },
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

  
  nitro: {
    prerender: {
      routes: ['/hrms-dashboard', '/application', '/calendar', '/department', '/employees', '/index', '/notifications',],
    },
  },

  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
})
