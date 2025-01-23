<script setup>
const compId = useId()
const list = defineModel("list", { required: false, type: Array, default: null })
// const filter = defineModel("filter", { required: false, type: Array, default: null })
const types = defineModel("types", { required: false, type: Array, default: null })
const addFilter = () => {
    list.value.push({
        type: null,
        value: null
    })
}

const setType = (thisItem) => {
    const data = types.value
    data.forEach((item) => {
        if (item.name === thisItem.type) {
            item.show = false
        }
    })
}

// const formatFilter = () => {
//     const formatArray = [
//         {
//             employee_id:""
//         }
//     ]
//     const array = list.value
//     array.forEach(element => {
//         formatArray.push({
//             formatArray.employee_id: element.value
//         })
//     })
// }
// const filteredArray = array1.filter(item1 => array2.some(item2 => item1.name === item2.name))
</script>
<template>
    <div class="w-full">
        <div class="w-full flex flex-row gap-4 items-center">
            <label
                :for="compId"
                class="block mb-1 text-sm font-medium text-gray-900"
            >
                Dynamic Filter
            </label>
            <button
                type="button"
                class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-blue-300 font-semibold text-sm p-1 me-2 mb-2 flex justify-center"
                @click="addFilter"
            >
                <Icon name="mdi:plus" class="h-5 w-5 text-white" />
            </button>
        </div>
        <div class="flex flex-row gap-4">
            <div v-for="item, index in list" :key="index" class="w-full">
                <select
                    v-model="item.type"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                    @change="setType(item)"
                >
                    <template v-for="itemTypes in types" :key="itemTypes.id">
                        <option v-show="itemTypes.show">
                            {{ itemTypes.name }}
                        </option>
                    </template>
                </select>
                <LayoutFormPsTextInput
                    v-model="item.value"
                    title=""
                />
            </div>
        </div>
    </div>
</template>
