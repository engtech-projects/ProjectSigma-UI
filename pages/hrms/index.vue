<script setup>
import { initFlowbite } from "flowbite"
import { useMain } from "@/stores/announcements"

const mains = useMain()
mains.getactiveAll()

const employeesData = ref([
    { name: "John Mayer", avatar: "/avatarexample.png", birthday: "1990-05-15" },
    { name: "Jane Smith", avatar: "/avatarexample.png", birthday: "1990-05-15" },
    { name: "John Doe", avatar: "/avatarexample.png", birthday: "1990-05-15" },
    { name: "Mark Unico", avatar: "/avatarexample.png", birthday: "1990-05-15" },
    { name: "John Doe", avatar: "/avatarexample.png", birthday: "1990-05-15" },
    { name: "Mark Unico", avatar: "/avatarexample.png", birthday: "1990-05-15" },
])

const employeeslateData = ref([
    { name: "Chris P. Bacon", avatar: "/avatarexample.png", late: "2" },
    { name: "Russell Sprout", avatar: "/avatarexample.png", late: "3" },
    { name: "Isla White", avatar: "/avatarexample.png", late: "3" },
    { name: "Ave Rill", avatar: "/avatarexample.png", late: "3" },
    { name: "Cara Mel", avatar: "/avatarexample.png", late: "3" },
    { name: "Cher E. Moya", avatar: "/avatarexample.png", late: "2" },
])

const employeesabsencesData = ref([
    { name: "Dixie Normus", avatar: "/avatarexample.png", absences: "2" },
    { name: "Robin Banks", avatar: "/avatarexample.png", absences: "3" },
    { name: "Ann Thrope", avatar: "/avatarexample.png", absences: "3" },
    { name: "Anita Break", avatar: "/avatarexample.png", absences: "3" },
    { name: "Carrie M. Bags", avatar: "/avatarexample.png", absences: "3" },
    { name: "Ivy Lague", avatar: "/avatarexample.png", absences: "2" },
])
// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite()
})

useHead({
    title: "Dashboard",
    meta: [{ name: "description", content: "SIGMA Dashboard" }],
    bodyAttrs: {
        class: "test",
    },
})
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
        <div
            class="grid-cols-2 border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
        >
            <HrmsDashboardAnnouncementTimeline />
        </div>
        <div
            class="border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
        >
            <HrmsDashboardBirthdaysCard
                :employees="employeesData"
                class="md: mt-2 md:mt-0 p-2"
            />
        </div>
        <div
            class="border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
        >
            <HrmsDashboardLatesCard
                :employees="employeeslateData"
                class="md: mt-2 md:mt-0 p-2"
            />
        </div>
        <div
            class="border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
        >
            <HrmsDashboardAbsencesCard
                :employees="employeesabsencesData"
                class="md: mt-2 md:mt-0 p-2"
            />
        </div>
        <div
            class="rounded-lg border-gray-300 dark:border-gray-600 h-full md:h-full"
        >
            <HrmsDashboardLatesAbsencesChart />
        </div>
        <div
            class="rounded-lg border-gray-300 dark:border-gray-600 h-full md:h-full"
        >
            <HrmsDashboardEmployeesChart />
        </div>
        <div
            class="rounded-lg border-gray-300 dark:border-gray-600 h-full md:h-full"
        >
            <HrmsDashboardMaleFemaleChart />
        </div>
    </div>
</template>
