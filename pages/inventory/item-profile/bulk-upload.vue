<script setup>
import { useItemBulkProfileStore } from "@/stores/inventory/bulkupload"

useHead({
    title: "Bulk Upload",
})

const main = useItemBulkProfileStore()
const { isLoading } = storeToRefs(main)

const headers = [
    { name: "Item Description", id: "item_description" },
    { name: "Thickness", id: "thickness_val" },
    { name: "Thickness UOM", id: "thickness_uom" },
    { name: "Length", id: "length_val" },
    { name: "Length UOM", id: "length_uom" },
    { name: "Width", id: "width_val" },
    { name: "Width UOM", id: "width_uom" },
    { name: "Height", id: "height_val" },
    { name: "Height UOM", id: "height_uom" },
    { name: "Outside Diameter", id: "outside_diameter_val" },
    { name: "Outside Diameter UOM", id: "outside_diameter_uom" },
    { name: "Inside Diameter", id: "inside_diameter_val" },
    { name: "Inside Diameter UOM", id: "inside_diameter_uom" },
    { name: "Volume", id: "volume_val" },
    { name: "Volume UOM", id: "volume_uom" },
    { name: "Specification", id: "specification" },
    { name: "Grade", id: "grade" },
    { name: "Color", id: "color" },
    { name: "UOM", id: "uom" },
    { name: "Item Group", id: "item_group" },
    { name: "Sub Item Group", id: "sub_item_group" },
    { name: "Inventory Type", id: "inventory_type" },
]

const BulkUpload = async (event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append("file", file)
    await main.doBulkUpload(formData)
}
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_itemprofile_bulkupload,
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
                    <label class="hover:text-green-600 hover:bg-gray-100 hover:border-green-600 w-full block mb-2 text-sm font-medium text-gray-100 text-center bg-green-600 px-2 py-3 cursor-pointer border rounded" for="bulk_upload_file">Upload CSV or Excel file</label>
                    <input
                        id="bulk_upload_file"
                        class="hidden text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                        type="file"
                        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        @change="BulkUpload"
                    >
                </div>
            </div>
            <LayoutLoadingContainer class="w-full" :loading="isLoading">
                <InventoryItemProfileBulkUploadTable
                    title="Unprocessed"
                    :header-columns="headers"
                    :data="main.listUnprocess.data"
                    title-color="text-red-500"
                    icon="material-symbols:dangerous"
                />
            </LayoutLoadingContainer>
            <LayoutLoadingContainer class="w-full" :loading="isLoading">
                <InventoryItemProfileBulkUploadTable
                    title="Duplicates"
                    :header-columns="headers"
                    :data="main.listDuplicates.data"
                    title-color="text-yellow-500"
                    icon="material-symbols:warning"
                />
            </LayoutLoadingContainer>
            <LayoutLoadingContainer class="w-full" :loading="isLoading">
                <InventoryItemProfileBulkUploadTable
                    :is-checkbox="true"
                    title="Processed"
                    :header-columns="headers"
                    :data="main.listProcess.data"
                    title-color="text-green-500"
                    icon="material-symbols:check-circle"
                    @change-params="saveBulkUpload"
                />
            </LayoutLoadingContainer>
        </div>
    </LayoutAcessContainer>
</template>
