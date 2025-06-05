<script lang="ts" setup>
interface SelectOption {
    label: string
    value: string
}
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
        type: Array<SelectOption>,
        default: [],
    },
    addAll: {
        type: Boolean,
        default: false,
    }
})
</script>
<template>
    <div class="PsSelect">
        <label
            :for="compId"
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
            {{ title }}<span class="text-red-600">{{ required ? "*" : "" }}</span>
        </label>

        <select
            :id="compId"
            v-model="model"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :required="required"
            :name="name"
        >
            <option
                v-if="addAll"
                class="uppercase cursor-pointer hover:bg-slate-100 px-3 py-1 border-b"
                value=""
            >
                All
            </option>
            <option
                v-for="option, i in optionsList"
                :key="i"
                class="uppercase cursor-pointer hover:bg-slate-100 px-3 py-1 border-b"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>
