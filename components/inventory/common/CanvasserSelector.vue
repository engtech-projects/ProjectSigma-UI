<script setup lang="ts">
import { useProcurementRequestStore } from "@/stores/inventory/procurement/request"
const route = useRoute()
const procurementStore = useProcurementRequestStore()
const { canvasser, canvasserForm } = storeToRefs(procurementStore)
const isSet = ref(true)
const procurementId = computed(() => route.query.pr_id)
const mainCanvasser = ref(null)
const snackbar = useSnackbar()

const doSet = () => {
    if (canvasser.value.list.length > 0) {
        mainCanvasser.value = canvasser.value.list[0].user_id
    } else {
        mainCanvasser.value = null
    }
    isSet.value = false
}

const cancelSet = () => {
    mainCanvasser.value = null
    isSet.value = true
}

const saveNewCanvasser = async () => {
    canvasserForm.value = {
        user_id: mainCanvasser.value,
        request_procurement_id: Number(procurementId.value),
    }
    await procurementStore.setCanvasser(Number(procurementId.value))
    if (procurementStore.errorMessage !== "") {
        snackbar.add({
            type: "error",
            text: procurementStore.errorMessage
        })
    } else {
        snackbar.add({
            type: "success",
            text: procurementStore.successMessage
        })
        isSet.value = true
    }
    await procurementStore.getOne(Number(procurementId.value))
}

</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2 justify-start items-start">
                <div class="flex flex-row gap-2">
                    <data v-show="AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_SETCANVASSER">
                        <div v-if="isSet" class="flex flex-row">
                            <button
                                class="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-md"
                                :disabled="canvasser.isLoading"
                                @click="doSet"
                            >
                                {{ canvasser.isLoading ? 'LOADING...' : 'SET CANVASSER' }}
                            </button>
                        </div>
                        <div v-else class="flex flex-row gap-2 justify-start items-center">
                            <button
                                class="px-3 py-1 bg-green-600 text-white text-xs font-bold"
                                :disabled="canvasser.isLoading || !mainCanvasser"
                                @click="saveNewCanvasser"
                            >
                                {{ canvasser.isLoading ? 'SAVING...' : 'SAVE' }}
                            </button>
                            <button
                                v-show="!canvasser.isLoading"
                                class="px-3 py-1 bg-red-600 text-white text-xs font-bold"
                                :disabled="canvasser.isLoading"
                                @click="cancelSet"
                            >
                                CANCEL
                            </button>
                        </div>
                    </data>
                </div>
                <div class="flex flex-col gap-2">
                    <template v-if="isSet">
                        <div v-if="canvasser.list?.length">
                            <span class="text-sm font-semibold">
                                {{ canvasser.list[0].user.employee.fullname_first }}
                            </span>
                        </div>
                    </template>
                </div>
            </div>
            <div v-show="!isSet" class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <div class="flex flex-row justify-between gap-4">
                        <HrmsCommonUserEmployeeSelector
                            v-model="mainCanvasser"
                            class="w-1/4"
                            :disabled="canvasser.isLoading"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
