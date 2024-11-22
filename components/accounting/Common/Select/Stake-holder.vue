<script setup>
const props = defineProps({
    selectedType: {
        type: String,
        required: false,
        default: "employee",
    },
    selectedId: {
        type: String,
        required: true,
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
                <option value="department">
                    Department
                </option>
                <option value="project">
                    Project
                </option>
                <option value="supplier">
                    Supplier
                </option>
                <option value="employee">
                    Employee
                </option>
                <option value="payee">
                    Payee
                </option>
            </select>
        </div>
        <div class="w-2/3">
            <AccountingCommonSelectStakeholderDepartmentSelector
                v-show="selectedType === 'department'"
                v-model:departmentInfo="stakeholderInfo"
            />
            <AccountingCommonSelectStakeholderProjectsSelector
                v-show="selectedType === 'project'"
                v-model:projectInfo="stakeholderInfo"
            />
            <AccountingCommonSelectStakeholderSupplierSelector
                v-show="selectedType === 'supplier'"
                v-model:supplierInfo="stakeholderInfo"
            />
            <AccountingCommonSelectStakeholderEmployeeSelector
                v-show="selectedType === 'employee'"
                v-model:employeeInfo="stakeholderInfo"
            />
            <AccountingCommonSelectStakeholderPayeeSelector
                v-show="selectedType === 'payee'"
                v-model:payeeInfo="stakeholderInfo"
            />
        </div>
    </div>
</template>
