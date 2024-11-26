<script setup>
import { useItemBulkProfileStore } from "@/stores/inventory/bulkupload"

useHead({
    title: "Bulk Upload",
})

const main = useItemBulkProfileStore()
const { isLoading } = storeToRefs(main)
const config = useRuntimeConfig()
const headers = [
    { name: "Item Description", id: "item_description" },
    { name: "Thickness", id: "thickness" },
    { name: "Length", id: "length" },
    { name: "Width", id: "width" },
    { name: "Height", id: "height" },
    { name: "Outside Diameter", id: "outside_diameter" },
    { name: "Inside Diameter", id: "inside_diameter" },
    { name: "Angle", id: "angle" },
    { name: "Size", id: "size" },
    { name: "Volume", id: "volume" },
    { name: "Weight", id: "weight" },
    { name: "Grade", id: "grade" },
    { name: "Volts", id: "volts" },
    { name: "Plates", id: "plates" },
    { name: "Part Number", id: "part_number" },
    { name: "Color", id: "color" },
    { name: "Specification", id: "specification" },
    { name: "UOM", id: "uom" },
    { name: "Item Group", id: "item_group" },
    { name: "Sub Item Group", id: "sub_item_group" },
    { name: "Inventory Type", id: "inventory_type" },
]

const snackbar = useSnackbar()

const BulkUpload = async (event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append("file", file)
    await main.doBulkUpload(formData)
}
const storeBulkUpload = async () => {
    main.listProcess.data = main.listProcess.data.filter(data => data.isCheck === true)
    await main.storeBulkUpload()
    if (main.errorMessage !== "") {
        snackbar.add({
            type: "error",
            text: main.errorMessage
        })
    } else {
        snackbar.add({
            type: "success",
            text: main.successMessage
        })
        main.$reset()
    }
}
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_itemprofile_bulkupload,
        ])"
    >
        <div class="flex flex-col gap-8 bg-white border border-gray-200 rounded-lg shadow-md p-4">
            <div class="flex flex-col md:flex-row justify-between items-center mt-4">
                <div>
                    <h1 class="text-xl font-bold uppercase">
                        Bulk Upload
                    </h1>
                </div>
                <div class="flex flex-row gap-4 w-full max-w-lg">
                    <div class="w-full max-w-sm">
                        <a target="_blank" :href="config.public.INVENTORY_API_URL + '/storage/public/downloadables/itemprofile.csv'" class="hover:text-green-600 hover:bg-gray-100 hover:border-green-600 w-full block mb-2 text-sm font-medium text-gray-100 text-center bg-green-600 px-2 py-3 cursor-pointer border rounded">
                            <Icon name="mage:file-download-fill" class="h-5 w-5 lg:h-5 lg:w-5" />
                            Download Template
                        </a>
                    </div>
                    <div class="w-full">
                        <label class="block hover:text-green-600 hover:bg-gray-100 hover:border-green-600 w-full mb-2 text-sm font-medium text-gray-100 text-center bg-green-600 px-2 py-3 cursor-pointer border rounded" for="bulk_upload_file">
                            <Icon name="i-ic:round-upload-file" class="h-5 w-5 lg:h-5 lg:w-5" />
                            Upload CSV / Excel File
                        </label>
                        <input
                            id="bulk_upload_file"
                            class="hidden text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                            type="file"
                            accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            @change="BulkUpload"
                        >
                    </div>
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
                    :is-item-code="true"
                    title="Processed"
                    :header-columns="headers"
                    :data="main.listProcess.data"
                    title-color="text-green-500"
                    icon="material-symbols:check-circle"
                    @do-store-bulk-upload="storeBulkUpload"
                />
            </LayoutLoadingContainer>
        </div>
    </LayoutAcessContainer>
</template>
