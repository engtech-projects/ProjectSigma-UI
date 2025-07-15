<script setup lang="ts">
import { useProcurementRequestStore } from "@/stores/inventory/procurement/request"

const procurementStore = useProcurementRequestStore()
const { canvasser, viewRequests } = storeToRefs(procurementStore)
const snackbar = useSnackbar()

const route = useRoute()

const isSet = ref(true)
const procurementId = computed(() => route.query.id)
const mainCanvasser = ref()
const selectedEmployee = ref(null)

const assignedEmployee = ref("Assigned canvasser name")

const doSet = () => {
    mainCanvasser.value = canvasser.value.list
    isSet.value = false
}

const saveNewCanvasser = async () => {
    try {
        await procurementStore.setCanvasser(viewRequests.value.details.id)
        snackbar.add({
            type: "success",
            text: canvasser.value.successMessage || "Canvasser set successfully."
        })
        isSet.value = true
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "An error occurred"
        })
    }
}

const cancelSelection = () => {
    selectedEmployee.value = null
    isSet.value = false
}

watch(selectedEmployee, (newValue) => {
    if (newValue) {
        mainCanvasser.value.push({
            id: null,
            user_id: newValue,
            procurement_id: procurementId.value,
        })
        selectedEmployee.value = null
    }
})
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2 justify-start items-start">
                <div class="flex flex-row gap-2">
                    <div v-if="isSet" class="flex flex-row">
                        <button
                            class="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-md"
                            @click="doSet"
                        >
                            SET CANVASSER
                        </button>
                    </div>
                    <div v-else class="flex flex-row gap-2 justify-start items-center">
                        <button
                            class="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-md"
                            @click="saveNewCanvasser"
                        >
                            SAVE
                        </button>
                        <button
                            class="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-md"
                            @click="cancelSelection"
                        >
                            CANCEL
                        </button>
                    </div>
                </div>
                <div v-if="isSet && assignedEmployee" class="text-sm font-semibold">
                    - {{ assignedEmployee }}
                </div>
            </div>

            <div v-if="!isSet" class="flex flex-col gap-4 w-1/2">
                <div class="flex flex-row justify-between gap-4 items-center">
                    <HrmsCommonUserEmployeeSelector
                        v-model="canvasser.params.user_ids[0]"
                        class="w-full"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
