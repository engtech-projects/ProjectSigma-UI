<script lang="ts" setup>
const modelHiring = defineModel("status", { required: false, type: String, default: "" })
const modelApplicant = defineModel("applicant", { required: false, type: String, default: "" })
const compId = useId()
</script>
<template>
    <div>
        <label
            :for="compId"
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
            Type of Hiring Status
        </label>
        <select
            :id="compId"
            v-model="modelHiring"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
        >
            <option
                class="uppercase cursor-pointer hover:bg-slate-100 px-3 py-1 border-b"
                value="Hired"
            >
                Hired
            </option>
            <option
                class="uppercase cursor-pointer hover:bg-slate-100 px-3 py-1 border-b"
                value="For Hiring"
            >
                For Hiring
            </option>
            <option
                class="uppercase cursor-pointer hover:bg-slate-100 px-3 py-1 border-b"
                value="Rejected"
            >
                Rejected
            </option>
            <option
                class="uppercase cursor-pointer hover:bg-slate-100 px-3 py-1 border-b"
                value="Processing"
            >
                Processing
            </option>
        </select>
    </div>
    <div>
        <LayoutFormPsTextInput v-model="modelApplicant" title="Applicant Name" class="w-full" />
    </div>
</template>
