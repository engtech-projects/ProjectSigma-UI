<!-- components/DateTimeHours.vue -->
<template>
    <div class="date-time-hours space-y-2 p-4 flex flex-col items-center">
        <div class="date text-xl md:text-2xl">
            {{ currentDate }}
        </div>
        <div class="time text-xl md:text-2xl">
            {{ currentTime }}
        </div>
    </div>
</template>

<script setup>

const currentDate = ref("")
const currentTime = ref("")

onMounted(() => {
    updateDateTime()
    setInterval(updateDateTime, 1000) // Update every second
})

const updateDateTime = () => {
    const now = new Date()

    // Format the date
    const optionsDate = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    currentDate.value = now.toLocaleDateString(undefined, optionsDate)

    // Format the time
    const optionsTime = { hour: "numeric", minute: "numeric", second: "numeric", hour12: true }
    currentTime.value = now.toLocaleTimeString(undefined, optionsTime)
}
</script>

<style scoped>

</style>
