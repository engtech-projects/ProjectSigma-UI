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
defineProps({
    showAll: { type: Boolean, default: false },
    title: {
        type: String,
        required: false,
        default: "",
    },
})
const compId = useId()
const suppliers = {
    1: { id: 1, company_name: "Supplier 1" },
    2: { id: 2, company_name: "Supplier 2" },
    3: { id: 3, company_name: "Supplier 3" },
    4: { id: 4, company_name: "Supplier 4" },
    5: { id: 5, company_name: "Supplier 5" },
}
</script>
<template>
    <div>
        <label
            :for="compId"
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
            {{ title }}
        </label>
        <div class="flex flex-row">
            <div class="w-auto">
                <select v-model="model" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    <option :value="null" disabled selected>
                        Choose Supplier
                    </option>
                    <option v-if="showAll" :value="null">
                        All
                    </option>
                    <!-- <option v-for="comp, index in supplierEnum.list" :key="index" :value=" comp.id">
                        {{ comp.company_name }}
                    </option> -->

                    <!-- static data-->
                    <option v-for="comp, index in suppliers" :key="index" :value=" comp.id">
                        {{ comp.company_name }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>
