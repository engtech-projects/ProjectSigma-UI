<script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    selectList: {
        type: Object,
        default: null,
    },
    addClass: {
        type: String,
        default: "",
    },
})
const model = defineModel({ type: String, required: true })
function selectOption (option: any) {
    model.value = option
}
</script>

<template>
    <div v-if="props.selectList.length" class="PsSelectInput">
        <select
            v-model="model"
            :class="addClass"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            <option
                v-for="option, i in props.selectList"
                :key="i"
                :value="option.id"
                @click="selectOption(option.id)"
            >
                {{ option.name }}
            </option>
        </select>
    </div>
    <div v-else class="PsSelectInput">
        <select
            v-model="model"
            :class="addClass"
        >
            <option>
                No Data
            </option>
        </select>
    </div>
</template>
