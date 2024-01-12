<script setup>
const headers = [
    { text: "ID", value: "id" },
    { text: "SCHEDULE NAME", value: "name" },
    { text: "CREATED AT", value: "created" },
    { text: "UPDATED AT", value: "updated" },
]

const items = [
    { id: "Schedule-0011", name: "Schedule Sample 11", created: "10/24/23", updated: "10/24/23" },
    { id: "Schedule-0012", name: "Schedule Sample 12", created: "10/24/23", updated: "10/24/23" },
    { id: "Schedule-0013", name: "Schedule Sample 13", created: "10/24/23", updated: "10/24/23" },
    { id: "Schedule-0014", name: "Schedule Sample 14", created: "10/24/23", updated: "10/24/23" },
    { id: "Schedule-0015", name: "Schedule Sample 15", created: "10/24/23", updated: "10/24/23" },
    { id: "Schedule-0016", name: "Schedule Sample 16", created: "10/24/23", updated: "10/24/23" },
    { id: "Schedule-0017", name: "Schedule Sample 17", created: "10/24/23", updated: "10/24/23" },
    { id: "Schedule-0018", name: "Schedule Sample 18", created: "10/24/23", updated: "10/24/23" },
]

definePageMeta({
    layout: "default",
})
useHead({
    title: "Schedule",
    meta: [
        { name: "description", content: "" }
    ],

})

</script>

<template>
    <div class="mt-10 md:flex gap-2">
        <div class="border-2 p-2 rounded-lg shadow w-full md:w-1/3 mb-4 ">
            <label for="eventTitle" class="text-2xl font-medium">Create Schedule</label>
            <div>
                <form action="" class="space-y-2 mt-4">
                    <div>
                        <label for="eventTitle">Schedule</label>
                        <input id="eventTitle" type="text" class="w-full rounded">
                    </div>

                    <div class="flex justify-end">
                        <button class="flex-1 text-white p-2 rounded bg-cyan-800 content-center" @click="addEvent">
                            <Icon name="material-symbols:construction-rounded" class="mr-2" />Add Schedule
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div class="border-2 p-2 rounded-lg shadow col-span-2 w-full md:w-3/4 mb-4">
            <label for="eventTitle" class="text-2xl font-medium">Schedule List</label>
            <Table :tbl-headers="headers" :tbl-items="items" />
        </div>
    </div>
</template>
