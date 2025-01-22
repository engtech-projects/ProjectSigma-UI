<script setup>
const compId = useId()
// Filter function
// const filterByCharacter = (array, key1, key2, character) => {
//     return array.filter(item =>
//         (item[key] && item[key1].includes(character)) ||
//         (item[key2] && item[key2].includes(searchString))
//     )
// }
// Result
// const result = filterByCharacter(data, "name", "key", "a")
</script>
<template>
    <div>
        <div class="flex flex-row gap-4 justify-center items-center">
            <label
                :for="compId"
                class="block mb-1 text-sm font-medium text-gray-900"
            >
                Dynamic Filter
            </label>
            <button
                type="button"
                class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-blue-300 font-semibold text-sm p-1 me-2 mb-2 flex justify-center"
            >
                <Icon name="mdi:plus" class="h-5 w-5 text-white" />
            </button>
        </div>
        <!-- <div class="flex flex-row gap-4">
            <div class="w-full">
            </div>
        </div> -->
    </div>
</template>
