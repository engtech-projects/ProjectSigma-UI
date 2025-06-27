<script setup>
import { useBOMStore } from "@/stores/inventory/bom"
const BOMStore = useBOMStore()
const { currentBom: List } = storeToRefs(BOMStore)
const today = new Date()
const currentYear = today.getFullYear()
onMounted(() => {
    if (!List.value.params.assignment_type) {
        List.value.params.assignment_type = "Project"
    }
})
const headers = [
    { name: "Item", id: "item_id" },
    { name: "Unit", id: "uom_id" },
    { name: "Price", id: "price" },
    { name: "Quantity", id: "quantity" },
    { name: "Amount", id: "amount" },
]
const filterBOM = () => {
    List.value.params.effectivity = currentYear
    if (List.value.params.assignment_type === "Department") {
        List.value.params.assignment_id = List.value.params.department_id
    } else if (List.value.params.assignment_type === "Project") {
        List.value.params.assignment_id = List.value.params.project_id
    }
    BOMStore.getCurrentBOM()
}
watch(() => List.value.params.assignment_type, (_newType) => {
    List.value.params.department_id = null
    List.value.params.project_id = null
    List.value.params.assignment_id = null
})
watch([() => List.value.params.department_id, () => List.value.params.project_id], () => {
    if (List.value.params.assignment_type &&
        ((List.value.params.assignment_type === "Department" && List.value.params.department_id) ||
        (List.value.params.assignment_type === "Project" && List.value.params.project_id))) {
        filterBOM()
    }
})

</script>
<template>
    <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b p-2">
        Current BOM
    </h5>
    <div class="text-gray-500 p-2">
        <form>
            <div class="flex flex-col gap-4 pt-4 w-full">
                <div class="flex flex-col gap-4 mb-5 max-w-xl">
                    <div class="flex flex-row gap-4 justify-start items-center">
                        <div>
                            <HrmsCommonDepartmentProjectSelector
                                v-model:select-type="List.params.assignment_type"
                                v-model:department-id="List.params.department_id"
                                v-model:project-id="List.params.project_id"
                                :show-all-option="false"
                                title="Assignment: "
                                @change="filterBOM"
                            />
                        </div>
                    </div>
                    <div class="flex flex-row gap-2 justify-start items-center">
                        <div>
                            <label> Year : </label>
                        </div>
                        <div>
                            <input
                                id="year"
                                v-model="currentYear"
                                type="text"
                                class="bg-gray-50 border disabled:opacity-75 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                disabled
                            >
                        </div>
                    </div>
                </div>
                <div>
                    <LayoutLoadingContainer class="w-full" :loading="List.isLoading">
                        <InventoryBomTable title="Item List" :header-columns="headers" :data-columns="List.list ?? []" />
                    </LayoutLoadingContainer>
                </div>
            </div>
        </form>
    </div>
</template>
