<script setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
enums.getSalarygradeEnums()
enums.getDepartmentEnums()
enums.getPositionEnums()
enums.getEmployeeEnum()
enums.getUserEmployeeEnums()
useHead({
    title: "Employee Schedule",
    meta: [{ name: "description", content: "" }],
})
</script>

<template>
    <div>
        <div class="text-2xl font-normal mb-4 mt-10 md:mt-0 ">
            Employee Schedule
        </div>
        <hr>
        <div>
            <HrmsScheduleEmp />
        </div>
    </div>
</template>
