<script lang="ts" setup>
import { useInventoryEnumsStore } from "@/stores/inventory/enum"

const enums = useInventoryEnumsStore()
const { supplierEnum } = storeToRefs(enums)

onMounted(() => {
    if (!supplierEnum.value.isLoaded) {
        enums.getSupplierEnums()
    }
})

const model = defineModel({ required: false, type: Number, default: null })

const props = defineProps({
    showAll: { type: Boolean, default: false },
    defaultValue: { type: String, default: null }, // Current supplier name
    placeholder: { type: String, default: null }, // Custom placeholder
})

// Computed property for the default value
const defaultValue = computed(() => {
    if (props.defaultValue) {
        const currentSupplier = supplierEnum.value.list.find(sup => sup.company_name === props.defaultValue)
        return currentSupplier?.id || null
    }

    return model.value
})

// Computed property for the placeholder text
const placeholderText = computed(() => {
    if (props.placeholder) {
        return props.placeholder
    }

    if (defaultValue.value) {
        const currentSupplier = supplierEnum.value.list.find(sup => sup.id === defaultValue.value)
        return currentSupplier?.company_name || null
    }

    return "Choose Supplier"
})
</script>

<template>
    <select
        v-model="defaultValue"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
    >
        <option :value="null" disabled selected>
            {{ placeholderText }}
        </option>
        <option v-if="showAll" :value="null">
            All
        </option>
        <option
            v-for="sup, index in supplierEnum.list"
            :key="index"
            :value="sup.id"
        >
            {{ sup.company_name }}
        </option>
    </select>
</template>
