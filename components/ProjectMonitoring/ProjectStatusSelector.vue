<script lang="ts" setup>
const stageStatus = defineModel({ required: true, type: Object, default: {} })
</script>

<template>
    <div class="w-full px-4">
        <label for="status" class="block text-sm font-medium text-gray-700">Project Status</label>
        <select v-model="stageStatus" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option :value="null" disabled selected>
                - Select -
            </option>
            <option :value="''">
                All
            </option>
            <option :value="ProjectStatus.DRAFT">
                Draft
            </option>
            <option :value="ProjectStatus.PROPOSAL">
                Proposal
            </option>
            <option :value="ProjectStatus.AWARDED">
                Awarded
            </option>
            <option :value="ProjectStatus.BIDDING">
                Bidding
            </option>
            <option :value="ProjectStatus.ON_HOLD">
                On Hold
            </option>
        </select>
    </div>
</template>
