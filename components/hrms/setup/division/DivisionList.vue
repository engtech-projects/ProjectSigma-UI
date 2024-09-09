<script setup>
const headers = [
    { text: "ID", value: "id" },
    { text: " Division NAME", value: "name" },
    { text: "CREATED AT", value: "created" },
    { text: "UPDATED AT", value: "updated" },
]

const items = [
    {
        id: " Division-0011",
        name: " Division Sample 11",
        created: "10/24/23",
        updated: "10/24/23",
    },
    {
        id: " Division-0012",
        name: " Division Sample 12",
        created: "10/24/23",
        updated: "10/24/23",
    },
    {
        id: " Division-0013",
        name: " Division Sample 13",
        created: "10/24/23",
        updated: "10/24/23",
    },
    {
        id: " Division-0014",
        name: " Division Sample 14",
        created: "10/24/23",
        updated: "10/24/23",
    },
    {
        id: " Division-0015",
        name: " Division Sample 15",
        created: "10/24/23",
        updated: "10/24/23",
    },
    {
        id: " Division-0016",
        name: " Division Sample 16",
        created: "10/24/23",
        updated: "10/24/23",
    },
    {
        id: " Division-0017",
        name: " Division Sample 17",
        created: "10/24/23",
        updated: "10/24/23",
    },
    {
        id: " Division-0018",
        name: " Division Sample 18",
        created: "10/24/23",
        updated: "10/24/23",
    },
]

</script>
<template>
    <div class="container mx-auto mt-2">
        <div class="w-full">
            <div class="divide-y divide-gray-100">
                <details class="group border border-gray-400 shadow-md rounded-lg p-2 mb-6" open>
                    <summary
                        class="flex cursor-pointer list-none items-center justify-between text-lg font-medium text-gray-900"
                    >
                        <label for="eventTitle" class="text-lg font-medium">Division List</label>

                        <div class="text-gray-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="block h-5 w-5 transition-all duration-300 group-open:rotate-180"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </div>
                    </summary>
                    <div class="pb-2 text-gray-500">
                        <Table :tbl-headers="headers" :tbl-items="items" />
                    </div>
                </details>
            </div>
        </div>
    </div>
</template>
