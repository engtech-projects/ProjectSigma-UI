<template>
    <div>
        <div class="text-2xl font-normal mb-4 mt-0  ">
            Reports
        </div>
        <hr>
        <div>
            <HrmsReportsDisplay />
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from "vue"
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

const month = ref({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
})

const year = ref(new Date().getFullYear())

definePageMeta({
    layout: "default",
}),

useHead({
    title: "Reports",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>
