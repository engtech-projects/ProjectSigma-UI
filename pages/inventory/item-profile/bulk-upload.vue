<script setup>
import { useItemBulkProfileStore } from "@/stores/inventory/bulkupload"

useHead({
    title: "Bulk Upload",
})

const main = useItemBulkProfileStore()

const headers = [
    { name: "Item description", id: "item_description" },
    { name: "Thickness", id: "thickness_val" },
    { name: "Length", id: "length_val" },
    { name: "Width", id: "width_val" },
    { name: "Height", id: "height_val" },
    { name: "Outside diameter", id: "outside_diameter_val" },
    { name: "Inside diameter", id: "inside_diameter_val" },
    { name: "Volume", id: "volume_val" },
    { name: "Grade", id: "grade" },
    { name: "Color", id: "color" },
    { name: "UOM", id: "uom" },
    { name: "Sub Item Group", id: "sub_item_group" },
    { name: "Item Group", id: "item_group" },
    { name: "Inventory Type", id: "inventory_type" },
]

const data = ref([])

const saveBulkUpload = () => {
    const formData = new FormData()
    formData.append("data", JSON.stringify(data.value))
}

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_item_profile,
        ])"
    >
        <div class="flex flex-col gap-8 bg-white border border-gray-200 rounded-lg shadow-md p-4">
            <div class="flex justify-between items-center mt-4">
                <div>
                    <h1 class="text-xl font-bold uppercase">
                        Bulk Upload
                    </h1>
                </div>
                <div class="w-full max-w-sm">
                    <label class="w-full block mb-2 text-sm font-medium text-gray-100 text-center bg-green-600 p-2 border rounded border-green-950" for="bulk_upload_file">Upload CSV or Excel file</label>
                    <input
                        id="bulk_upload_file"
                        class="hidden text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                        type="file"
                        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    >
                </div>
            </div>
            <InventoryItemProfileBulkUploadTable title="UNPROCESS" :header-columns="headers" :data="main.listUnprocess.data" />
            <InventoryItemProfileBulkUploadTable title="DUPLICATES" :header-columns="headers" :data="main.listDuplicates.data" />
            <InventoryItemProfileBulkUploadTable :is-checkbox="true" title="PROCESS" :header-columns="headers" :data="main.listProcess.data" @change-params="saveBulkUpload" />
        </div>
    </LayoutAcessContainer>
</template>
