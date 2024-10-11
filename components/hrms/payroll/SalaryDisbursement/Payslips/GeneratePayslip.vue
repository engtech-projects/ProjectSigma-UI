<script  setup lang="ts">
import PsButton from "~/components/layout/Form/PsButton.vue"

const props = defineProps({
    data: {
        type: Object,
        required: true,
    }
})
const config = useRuntimeConfig()
const generatePayslips = ref([])
const selectAll = ref(false)
const selectAllEmployees = () => {
    generatePayslips.value = selectAll.value ? props.data.map((employeePayslip: any) => employeePayslip.id) : []
}
const generatePayslip = () => {
    const url = new URL(config.public.HRMS_API_URL + "/api/payslip")
    url.searchParams.set("ids", generatePayslips.value.join(","))
    window.open(url.toString(), "_blank")
}
</script>
<template>
    <LayoutBoards title="Generate Payslip" class="w-full" :loading="false">
        <div class="mt-5 mb-6 p-2">
            <div />
            <div class="h-80 max-h-80 overflow-auto text-center">
                <table class="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
                    <thead class="sticky top-0 text-gray-500 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th class="py-2">
                                <input id="selectAll" v-model="selectAll" type="checkbox" class="h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-gray-900 checked:bg-gray-900 hover:before:opacity-10" @change="selectAllEmployees">
                                <label for="selectAll" class="items-center space-x-2">
                                    <span class="cursor-pointer text-sm"> Employee ID</span>
                                </label>
                            </th>
                            <th class="pb-2 pt-2">
                                Employee Name
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="employeePayslip, vfkey in data" :key="vfkey" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td>
                                <label :for="vfkey+'-checkbox'" class="flex items-center space-x-2">
                                    <input
                                        :id="vfkey+'-checkbox'"
                                        v-model="generatePayslips"
                                        type="checkbox"
                                        name="employeeSelectorCheckBoxes"
                                        :value="employeePayslip.id"
                                        class="h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-gray-900 checked:bg-gray-900 hover:before:opacity-10"
                                    >
                                    <span class="cursor-pointer text-sm">{{ employeePayslip.employee_company_id }}</span>
                                </label>
                            </td>
                            <td>
                                <label :for="vfkey+'-checkbox'" class="flex items-center space-x-2">
                                    <span class="cursor-pointer text-sm">{{ employeePayslip.employee_name }}</span>
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <PsButton class="mt-4" message="Generate Payslip" @click="generatePayslip" />
        </div>
    </LayoutBoards>
</template>
