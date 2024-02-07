<script setup>
import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/employee/manpower"
import { useDepartmentStore } from "@/stores/departments"

const departments = useDepartmentStore()
const manpowers = useManpowerStore()
const { isEdit } = storeToRefs(manpowers)
manpowers.getManpower()
departments.getDepartmentList()

useHead({
    title: "Manpower Request",
})

</script>

<template>
    <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div>
            <EmployeeManpowerAddRequest v-show="!isEdit" />
            <EmployeeManpowerEditRequest v-show="isEdit" />
        </div>
        <div>
            <EmployeeManpowerMonitoringList />
        </div>
    </div>
</template>
