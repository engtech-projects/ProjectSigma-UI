// https://nuxt.com/docs/api/configuration/nuxt-config

import { createRouter } from './router.js'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@samk-dev/nuxt-vcalendar',
  ],

})
