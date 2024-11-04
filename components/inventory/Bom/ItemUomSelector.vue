<script lang="ts" setup>
import { useInventoryEnumsStore } from "@/stores/inventory/enum"
const enums = useInventoryEnumsStore()
const { itemEnum } = storeToRefs(enums)
const model = defineModel({ required: false, type: Number, default: null })
const compId = useId()
</script>
<template>
    <div>
        <select
            :id="compId"
            v-model="model"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            <option :value="null" selected>
                --Select Unit--
            </option>
            <option
                v-for="itemSelect, index in itemEnum.list.uom"
                :key="index"
                :value="itemSelect.id"
            >
                {{ itemSelect.item_name }}
            </option>
        </select>
    </div>
</template>
