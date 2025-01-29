<script setup>
const props = defineProps({
    selectedType: {
        type: String,
        required: false,
        default: "",
    },
    selectedId: {
        type: String,
        required: true,
    },
    filterOptions: {
        type: Array,
        required: false,
        default: () => [],
    },
})
const stakeholderInfo = defineModel("stakeholderInfo", { required: false, type: Object, default: {} })
const selectedType = ref(props.selectedType)
</script>
<template>
    <div class="w-full flex flex-row gap-4 min-w-max">
        <div class="w-1/3">
            <select
                id="type"
                v-model="selectedType"
                name="type"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            >
                <option value="">
                    -Select Type-
                </option>
                <option v-for="option in props.filterOptions" :key="option" :value="option">
                    {{ option.charAt(0).toUpperCase() + option.slice(1) }}
                </option>
            </select>
        </div>
        <div class="w-2/3">
            <AccountingCommonSelectStakeholderDepartmentSelector
                v-show="selectedType === 'department'"
                v-model:departmentInfo="stakeholderInfo"
                :select-type="selectedType"
            />
            <AccountingCommonSelectStakeholderProjectsSelector
                v-show="selectedType === 'project'"
                v-model:projectInfo="stakeholderInfo"
                :select-type="selectedType"
            />
            <AccountingCommonSelectStakeholderSupplierSelector
                v-show="selectedType === 'supplier'"
                v-model:supplierInfo="stakeholderInfo"
                :select-type="selectedType"
            />
            <AccountingCommonSelectStakeholderEmployeeSelector
                v-show="selectedType === 'employee'"
                v-model:employeeInfo="stakeholderInfo"
                :select-type="selectedType"
            />
            <AccountingCommonSelectStakeholderPayeeSelector
                v-show="selectedType === 'payee'"
                v-model:payeeInfo="stakeholderInfo"
                :select-type="selectedType"
            />
        </div>
    </div>
</template>
