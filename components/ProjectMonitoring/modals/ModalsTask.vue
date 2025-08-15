<script setup lang="ts">
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { useTaskStore } from "@/stores/project-monitoring/task"
import { usePhaseStore } from "@/stores/project-monitoring/phase"
import { useResourceStore } from "@/stores/project-monitoring/resource"
const resourceStore = useResourceStore()
const taskStore = useTaskStore()
const phaseStore = usePhaseStore()
const projectStore = useProjectStore()
defineProps({
    showModal: {
        type: Boolean,
        required: true,
        default: false
    },
    isEdit: {
        type: Boolean,
        required: false,
        default: false
    },
})
const boardLoading = ref(false)
const snackbar = useSnackbar()
const updateAmount = () => {
    taskStore.task.amount = Number(taskStore.task.quantity) * Number(taskStore.task.unit_price)
}
watch(() => taskStore.task.quantity, updateAmount)
watch(() => taskStore.task.unit_price, updateAmount)

const handleSubmit = async (isEdit: boolean) => {
    try {
        boardLoading.value = true
        if (isEdit) {
            await taskStore.editTask()
        } else {
            await taskStore.createTask()
        }
        if (taskStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: taskStore.errorMessage
            })
        } else {
            if (!isEdit) {
                emit("save", clone(taskStore.task))
            }
            snackbar.add({
                type: "success",
                text: taskStore.successMessage
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: taskStore.errorMessage
        })
    } finally {
        boardLoading.value = false
        emit("hideModal")
        projectStore.getProject(projectStore.information.id)
    }
}
const emit = defineEmits(["hideModal", "save"])
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
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-end gap-2">
                    <h1 class="text-2xl uppercase">
                        {{ isEdit ? "Edit Item" : "Create Item" }}
                    </h1>
                </div>
                <Icon name="material-symbols:close-rounded" class="h-6 w-6 text-gray-500 hover:text-gray-800 cursor-pointer" @click="emit('hideModal')" />
            </div>
            <div class="flex gap-4 items-center">
                <label class="text-sm text-gray-700 uppercase text-md">
                    Part Name:
                </label>
                <h3 class="text-green-600 text-lg">
                    {{ phaseStore.phase.name }}
                </h3>
            </div>
            <div class="mb-10">
                <p class="text-xs text-gray-400">
                    Fill out the details below to create a new part. Provide a clear name and a short description for identification.
                </p>
            </div>
            <form @submit.prevent="handleSubmit(isEdit)">
                <div class="grid grid-cols-2 gap-6 mb-4">
                    <div class="flex flex-col">
                        <label class="text-sm text-gray-700 mb-2">
                            Item Name *
                        </label>
                        <input
                            v-model="taskStore.task.name"
                            type="text"
                            class="border border-gray-300 rounded-md"
                            placeholder="Item Name"
                            required
                        >
                    </div>
                    <div class="flex flex-col">
                        <label class="text-sm mb-1 text-gray-700">
                            Amount
                        </label>
                        <input
                            v-model="taskStore.task.amount"
                            type="text"
                            class="border border-gray-300 rounded-md"
                            disabled
                            placeholder="0.00"
                            required
                        >
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-6 mb-4">
                    <div class="flex flex-col">
                        <label class="text-sm mb-1 text-gray-700">
                            Quantity *
                        </label>
                        <input
                            v-model="taskStore.task.quantity"
                            type="number"
                            class="border border-gray-300 rounded-md"
                            placeholder="0"
                            required
                        >
                    </div>
                    <div class="flex flex-col">
                        <label class="text-sm mb-1 text-gray-700">
                            Unit *
                        </label>
                        <select v-model="taskStore.task.unit" class="border border-gray-300 rounded-md uppercase" required>
                            <option value="" disabled selected>
                                Select Unit
                            </option>
                            <option v-for="unit in resourceStore.units" :key="unit.name" :value="unit.symbol">
                                {{ unit.name + ' (' + unit.symbol + ')' }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-6 mb-4">
                    <div class="flex flex-col">
                        <label class="text-sm mb-1 text-gray-700">
                            Unit Price *
                        </label>
                        <input
                            v-model="taskStore.task.unit_price"
                            type="number"
                            class="border border-gray-300 rounded-md"
                            placeholder="0.00"
                            required
                        >
                    </div>
                </div>
                <div class="flex flex-col mb-4">
                    <label class="text-sm mb-1 text-gray-700">
                        Description *
                    </label>
                    <textarea
                        v-model="taskStore.task.description"
                        class="border border-gray-300 rounded-md w-full h-56 resize-none"
                        required
                    />
                </div>
                <div class="flex justify-end">
                    <button v-if="!taskStore.task.id || isEdit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-36 h-10" type="submit">
                        {{ isEdit ? "Update Item" : "Create Item" }}
                    </button>
                </div>
            </form>
        </div>
    </ModalContainer>
</template>
