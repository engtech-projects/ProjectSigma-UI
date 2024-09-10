<script lang="ts" setup>
const model = defineModel({ required: false, type: String, default: "" })
const compId = useId()
defineProps({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
        default: "",
    },
    required: {
        type: Boolean,
        default: false,
    },
    optionsList: {
        type: Array<any>,
        default: [],
    },
})
</script>
<template>
    <div class="PsSelect">
        <label
            :for="compId"
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
            {{ title }}
        </label>

        <select
            :id="compId"
            v-model="model"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :required="required"
            :name="name"
        >
            <option
                v-for="option, i in optionsList"
                :key="i"
                class="uppercase cursor-pointer hover:bg-slate-100 px-3 py-1 border-b"
            >
                {{ option }}
            </option>
        </select>
    </div>
</template>
