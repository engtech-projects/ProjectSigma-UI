<script setup lang="ts">
import { useHMOStore } from "@/stores/hrms/setup/hmo"
const hmoStore = useHMOStore()
const { hmo, hmolist, isEdit } = storeToRefs(hmoStore)

const headers = [
    { text: "ID", value: "hmo_id" },
    { text: "HMO Name", value: "hmo_name" },
    { text: "Employee", value: "employee" },
    { text: "Employee Share", value: "employee_share" },
    { text: "Actions", value: "actions" },
]

const editItem = (item) => {
    isEdit.value = true
    hmo.value = item
}
</script>

<template>
    <div>
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.hrms_hmo
            ])"
        >
            <h2 class="text-2xl font-semibold dark:text-white">
                Health Maintenance Organization
            </h2>

            <!-- Add HMO Share -->
            <HrmsHmoNew />

            <!-- Contribution Table -->
            <div
                class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto"
            >
                <label
                    for=""
                    class="text-xl font-semibold text-gray-900"
                >Contribution Table</label>

                <EasyDataTable
                    show-index
                    :headers="headers"
                    :items="hmolist"
                    class="mt-5"
                >
                    <template #item-actions="item">
                        <button @click="hmoStore.deleteHmo(item.id)">
                            <!-- Your delete button icon -->
                        </button>
                        <button @click="editItem(item)">
                            <!-- Your edit button icon -->
                        </button>
                    </template>
                </EasyDataTable>
            </div>

            <!-- Edit Contribution Record -->
            <div
                class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto"
            >
                <label
                    for=""
                    class="text-xl font-semibold text-gray-900"
                >Edit Contribution Record</label>

                <div class="mt-5 mb-6">
                    <label
                        for="employee"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Employee</label>
                    <input
                        id="employee"
                        v-model="hmoStore.editingItem.employee"
                        disabled
                        readonly
                        type="text"
                        class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                    >
                </div>

                <div class="mb-6">
                    <label
                        for="employee_share"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Employee Share</label>
                    <input
                        id="employee_share"
                        v-model="hmoStore.editingItem.employee_share"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                    >
                </div>

                <div class="flex flexrow gap-4">
                    <button
                        type="submit"
                        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        @click="hmoStore.submitEdit"
                    >
                        Update
                    </button>
                    <button
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="hmoStore.clearEditingItem"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </LayoutAcessContainer>
    </div>
</template>
