<script setup>
const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const props = defineProps({
    propTitle: {
        type: String,
        required: true,
    },
    propData: {
        type: Object,
        required: true,
    },
})
const getDayNamesBetweenDates = (start, end) => {
    const days = []
    const currentDate = new Date(start)
    let currDate = formatDate(currentDate)
    while (currDate <= end) {
        days.push(dayNames[currentDate.getDay()])
        currentDate.setDate(currentDate.getDate() + 1)
        currDate = formatDate(currentDate)
    }
    return days
}
const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
}
const daysBetween = getDayNamesBetweenDates(props.propData.cutoff_start, props.propData.cutoff_end)
</script>
<template>
    <div class="w-full">
        <div class="text-center mb-4">
            <h1 class="text-xl font-bold">
                EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
            </h1>
            <h2 class="text-lg">
                {{ propTitle }}
            </h2>
        </div>
        <div class="mb-2 flex justify-between">
            <div class="w-full flex gap-4">
                <span class="font-semibold text-sm">Project: </span> <span class="font-light text-sm">{{ propData.charge_assignment.department_name }}</span>
                <span class="font-semibold text-sm ml-4">Period Covered: </span> <span class="font-light text-sm">{{ propData.cutoff_start }} - {{ propData.cutoff_end }}</span>
                <span class="font-semibold text-sm ml-4">Allowance Date: </span> <span class="font-light text-sm">{{ propData.allowance_date }}</span>
            </div>
        </div>
        <table class="min-w-full border border-zinc-300">
            <thead class="bg-zinc-100">
                <tr>
                    <th class="border border-zinc-300 px-2 py-1 text-left">
                        NO.
                    </th>
                    <th class="border border-zinc-300 px-2 py-1 text-left">
                        Fullname
                    </th>
                    <th class="border border-zinc-300 px-2 py-1 text-left">
                        Designation
                    </th>
                    <th class="border border-zinc-300 px-2 py-1 text-left">
                        Rate
                    </th>
                    <th v-for="day, index in daysBetween" :key="index" class="border border-zinc-300 px-2 py-1 text-left">
                        {{ day }}
                    </th>
                    <th class="border border-zinc-300 px-2 py-1 text-left">
                        Reg. Day(s)
                    </th>
                    <th class="border border-zinc-300 px-2 py-1 text-left">
                        TOTAL
                    </th>
                    <th class="border border-zinc-300 px-2 py-1 text-left">
                        Total Net Pay
                    </th>
                    <th class="border border-zinc-300 px-2 py-1 text-left">
                        SIGNATURE
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr>
                    <td class="border border-zinc-300 px-2 py-1">
                        6
                    </td>
                    <td class="border border-zinc-300 px-2 py-1">
                        JURADO, BERNIE
                    </td>
                    <td class="border border-zinc-300 px-2 py-1">
                        BH-85 OPTR
                    </td>
                    <td class="border border-zinc-300 px-2 py-1">
                        80
                    </td>
                    <td v-for="day, index in daysBetween" :key="index" class="border border-zinc-300 px-2 py-1">

                    </td>
                    <td class="border border-zinc-300 px-2 py-1">
                        0
                    </td>
                    <td class="border border-zinc-300 px-2 py-1">
                        0
                    </td>
                    <td class="border border-zinc-300 px-2 py-1">
                        0
                    </td>
                    <td class="border border-zinc-300 px-2 py-1">
                        Signature
                    </td>
                </tr>
                <tr>
                    <td :colspan="6 + daysBetween.length" class="border border-zinc-300 px-2 py-1">
                    </td>
                    <td colspan="2" class="border border-zinc-300 px-2 py-1">
                        TOTAL : 10000
                    </td>
                </tr> -->
            </tbody>
        </table>
    </div>
</template>
