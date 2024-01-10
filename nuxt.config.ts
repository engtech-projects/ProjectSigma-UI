// https://nuxt.com/docs/api/configuration/nuxt-config

import { createRouter } from './router.js'


export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@samk-dev/nuxt-vcalendar',
    'nuxt-icon',
    'nuxt-auth-sanctum'
  ],

  sanctum: {
    baseUrl: 'http://localhost:80', // Laravel API
    origin: 'http://localhost:3000', // Nuxt app
    endpoints: {
      csrf: '/sanctum/csrf-cookie', // CSRF cookie endpoint
      login: '/login', // Endpoint that accepts user credentials
      logout: '/logout', // Endpoint to destroy the current session
      user: '/api/user', // Endpoint that return current user information
    },
    csrf: {
      cookie: 'XSRF-TOKEN', // CSRF cookie name
      header: 'X-XSRF-TOKEN', // CSRF header name
    },
    redirect: {
      onLogin: '/welcome',
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
