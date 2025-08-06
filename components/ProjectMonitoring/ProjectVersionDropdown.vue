<script lang="ts" setup>
import { useRevisionStore } from "@/stores/project-monitoring/revisions"
const revisionStore = useRevisionStore()
</script>
<template>
    <div class="mb-4 flex flex-col gap-2">
        <label class="text-md font-semibold">
            <Icon name="mdi:history" />
            Project Version
        </label>
        <div class="relative">
            <select
                v-model="revisionStore.revisionSelected"
                class="block w-full bg-gray-100 border border-gray-300 text-gray-700 text-xs font-medium rounded px-3 py-2"
            >
                <option :value="null" selected>
                    Main Project
                </option>
                <option
                    v-for="s, i in revisionStore.list"
                    :key="i"
                    :value="s.id"
                >
                    {{ s?.project_name_version }}
                </option>
            </select>
        </div>
    </div>
</template>
