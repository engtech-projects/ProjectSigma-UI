<script setup>
import { storeToRefs } from "pinia"
import { useDepartmentStore } from "@/stores/departments"

const departments = useDepartmentStore()
const { isEdit } = storeToRefs(departments)
departments.getDepartment()

useHead({
    title: "Department",
})

</script>

<template>
    <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-4">
        <HrmsDepartmentNewDepartment
            v-show="!isEdit"
        />
        <HrmsDepartmentEditDepartment v-show="isEdit" />
        <HrmsDepartmentList />
    </div>
</template>
