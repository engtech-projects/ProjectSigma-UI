// router.js

import Vue from "vue"
import VueRouter from "vue-router"
import Calendar from "~/components/calendar.vue"

Vue.use(VueRouter)

const routes = [
    { path: "/calendar", component: Calendar }
]

export function createRouter () {
    return new VueRouter({
        mode: "history",
        routes
    })
}
