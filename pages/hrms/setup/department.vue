<script setup>
import { useDepartmentStore } from "@/stores/hrms/setup/departments"
const departments = useDepartmentStore()
departments.getDepartment()

useHead({ title: "Department" })

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.hrms_setup_department])"
    >
        <LayoutContainerLastchild>
            <HrmsDepartmentList />
            <LayoutContainerLastchild
                v-if="departments.isCreate"
            >
                <HrmsDepartmentNewDepartment
                    @submit-success="departments.isCreate = false"
                />
            </LayoutContainerLastchild>
            <LayoutContainerLastchild
                v-if="departments.isEdit"
            >
                <LayoutLoadingContainer
                    :loading="departments.boardLoading"
                >
                    <HrmsDepartmentEditDepartment
                        @submit-success="departments.isEdit = false"
                    />
                </LayoutLoadingContainer>
            </LayoutContainerLastchild>
        </LayoutContainerLastchild>
    </LayoutAcessContainer>
</template>
