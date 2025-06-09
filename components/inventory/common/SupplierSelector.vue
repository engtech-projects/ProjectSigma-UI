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
    defaultValue: { type: String, default: null },
    placeholder: { type: String, default: null },
})

// watchEffect(() => {
//     if (props.defaultValue && !model.value) {
//         const currentSupplier = supplierEnum.value.list.find(sup => sup.company_name === props.defaultValue)
//         if (currentSupplier) {
//             model.value = currentSupplier.id
//         }
//     }
// })
watch(
    [() => props.defaultValue, () => model.value],
    ([defaultValue, value]) => {
        if (defaultValue && !value) {
            const currentSupplier = supplierEnum.value.list.find(sup => sup.company_name === defaultValue)
            if (currentSupplier) {
                model.value = currentSupplier.id
            }
        }
    },
    { immediate: true }
)

const placeholderText = computed(() => {
    if (props.placeholder) {
        return props.placeholder
    }

    if (model.value) {
        const currentSupplier = supplierEnum.value.list.find(sup => sup.id === model.value)
        return currentSupplier?.company_name || "Choose Supplier"
    }

    return "Choose Supplier"
})
</script>

<template>
    <select
        v-model="model"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
    >
        <option :value="null" disabled :selected="!model">
            {{ placeholderText }}
        </option>
        <option v-if="showAll" :value="null">
            All
        </option>
        <option
            v-for="(sup, index) in supplierEnum.list"
            :key="index"
            :value="sup.id"
        >
            {{ sup.company_name }}
        </option>
    </select>
</template>
