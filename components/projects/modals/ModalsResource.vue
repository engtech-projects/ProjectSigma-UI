<script lang="ts" setup>
import { useResourceStore } from "@/stores/project-monitoring/resource"
import { useTaskStore } from "@/stores/project-monitoring/task"
const taskStore = useTaskStore()
const resourceStore = useResourceStore()
const props = defineProps({
    showModal: {
        type: Boolean,
        required: true,
        default: false
    },
    taskId: {
        type: Number,
        required: true
    },
})
const boardLoading = ref(false)
const snackbar = useSnackbar()
const handleSubmit = async () => {
    try {
        boardLoading.value = true
        resourceStore.resource.task_id = props.taskId
        if (resourceStore.resource.id) {
            await resourceStore.editResource()
        } else {
            await resourceStore.createResource()
        }
        if (resourceStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: resourceStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: resourceStore.successMessage
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: resourceStore.errorMessage
        })
    } finally {
        boardLoading.value = false
        taskStore.getTask(props.taskId)
        emit("hideModal")
    }
}
const emit = defineEmits(["hideModal"])
</script>
<template>
    <ModalContainer
        :show="showModal"
        :local="true"
        :header="false"
        bg="bg-gray-50"
        size="modal-lg"
        @hide="emit('hideModal')"
    >
        <div class="flex flex-col p-4">
            <AccountingLoadScreen :is-loading="boardLoading" />
            <div class="flex items-center justify-between mb-8">
                <div class="flex items-end gap-2">
                    <h1 class="text-3xl uppercase">
                        Create Resource
                    </h1>
                </div>
                <Icon name="material-symbols:close-rounded" class="h-6 w-6 text-gray-500 hover:text-gray-800 cursor-pointer" @click="emit('hideModal')" />
            </div>
            <form @submit.prevent="handleSubmit">
                <div v-if="resourceStore.resource.name_id === DetailedEstimatesUnitIndex.labor || resourceStore.resource.name_id === DetailedEstimatesUnitIndex.equipment" class="grid grid-cols-2 gap-6 mb-4">
                    <div>
                        <div class="flex flex-col">
                            <label v-if="resourceStore.resource.name_id === DetailedEstimatesUnitIndex.labor" class="text-md text-gray-700">
                                Number of Person
                            </label>
                            <label v-else class="text-md text-gray-700">
                                Number of Equipment
                            </label>
                            <input
                                v-model="resourceStore.resource.unit_count"
                                type="number"
                                class="border border-gray-300 rounded-md"
                                min="1"
                                required
                            >
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-6 mb-4">
                    <div class="flex flex-col">
                        <label class="text-md text-gray-700">
                            Resource Name
                        </label>
                        <select v-model="resourceStore.resource.name_id" class="border border-gray-300 rounded-md" disabled>
                            <option value="" disabled selected>
                                Select Resource Name
                            </option>
                            <option v-for="resourceName in resourceStore.resourceNames" :key="resourceName.id" :value="resourceName.id">
                                {{ resourceName.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <div class="flex flex-col">
                            <label v-if="resourceStore.resource.name_id === DetailedEstimatesUnitIndex.labor || resourceStore.resource.name_id === DetailedEstimatesUnitIndex.equipment" class="text-md text-gray-700">
                                Hourly Rate
                            </label>
                            <label v-else class="text-md text-gray-700">
                                Unit Price
                            </label>
                            <input
                                v-model="resourceStore.resource.unit_cost"
                                type="text"
                                class="border border-gray-300 rounded-md"
                                placeholder="0.00"
                                required
                            >
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-6 mb-4">
                    <div class="flex flex-col">
                        <label v-if="resourceStore.resource.name_id === DetailedEstimatesUnitIndex.labor || resourceStore.resource.name_id === DetailedEstimatesUnitIndex.equipment" class="text-md text-gray-700">
                            No. of Hours
                        </label>
                        <label v-else class="text-md text-gray-700">
                            Quantity
                        </label>
                        <input
                            v-model="resourceStore.resource.quantity"
                            type="number"
                            class="border border-gray-300 rounded-md"
                            required
                        >
                    </div>
                    <div class="flex flex-col">
                        <label class="text-md text-gray-700">
                            Unit
                        </label>
                        <select
                            v-model="resourceStore.resource.unit"
                            class="border border-gray-300 rounded-md uppercase"
                            required
                        >
                            <template v-if="resourceStore.resource.name_id === DetailedEstimatesUnitIndex.labor || resourceStore.resource.name_id === DetailedEstimatesUnitIndex.equipment">
                                <option value="hourly">
                                    Hourly
                                </option>
                            </template>
                            <template v-else>
                                <option value="" disabled selected>
                                    Select Unit
                                </option>
                                <option v-for="unit in resourceStore.units" :key="unit.name" :value="unit.symbol">
                                    {{ unit.name + ' (' + unit.symbol + ')' }}
                                </option>
                            </template>
                        </select>
                    </div>
                </div>
                <div class="flex flex-col mb-4">
                    <label class="text-md text-gray-700">
                        Description
                    </label>
                    <textarea
                        v-model="resourceStore.resource.description"
                        class="border border-gray-300 rounded-md w-full h-56 resize-none"
                        required
                    />
                </div>
                <div class="flex justify-end">
                    <button v-if="!resourceStore.resource.id" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-36 h-10" type="submit">
                        Create Resource
                    </button>
                    <button v-else class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-36 h-10" type="submit">
                        Update Resource
                    </button>
                </div>
            </form>
        </div>
    </ModalContainer>
</template>
