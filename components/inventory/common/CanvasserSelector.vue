<script setup>
const isSelecting = ref(false)
const selectedEmployee = ref(null)
const assignedEmployee = ref(null)

const startSelection = () => {
    isSelecting.value = true
}

const saveNewPss = () => {
    if (selectedEmployee.value) {
        assignedEmployee.value = selectedEmployee.value
        selectedEmployee.value = null
        isSelecting.value = false
    }
}

const cancelSelection = () => {
    selectedEmployee.value = null
    isSelecting.value = false
}

const handleEmployeeChange = (value) => {
    selectedEmployee.value = value
}
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2 justify-start items-start">
                <div class="flex flex-row gap-2">
                    <div v-if="AccessibilityTypes.ADMIN_ONLY">
                        <div v-if="!isSelecting" class="flex flex-row">
                            <button
                                class="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-md"
                                @click="startSelection"
                            >
                                SET CANVASSER
                            </button>
                        </div>
                        <div v-else class="flex flex-row gap-2 justify-start items-center">
                            <button
                                class="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-md"
                                @click="saveNewPss"
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
                </div>
                <div v-if="!isSelecting && assignedEmployee" class="text-sm font-semibold">
                    - {{ assignedEmployee }}
                </div>
            </div>
            <div v-if="isSelecting" class="flex flex-col gap-4 w-1/2">
                <div class="flex flex-row justify-between gap-4">
                    <HrmsCommonUserEmployeeSelector
                        :value="selectedEmployee"
                        class="w-full"
                        @update:value="handleEmployeeChange"
                    />
                    <div class="flex flex-row gap-2">
                        <button class="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-md" @click="removePss(itemIndex)">
                            -
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
