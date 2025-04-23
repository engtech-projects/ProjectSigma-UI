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
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-end gap-2">
                    <h1 class="text-3xl uppercase">
                        Create Task
                    </h1>
                    <h3 class="text-gray-400 text-lg">
                        Task Creation
                    </h3>
                </div>
                <Icon name="material-symbols:close-rounded" class="h-6 w-6 text-gray-500 hover:text-gray-800 cursor-pointer" @click="emit('hideModal')" />
            </div>
            <div class="flex gap-4 items-center mb-10">
                <label class="text-md text-gray-700 uppercase text-md">
                    Phase name
                </label>
                <h3 class="text-green-600 text-lg">
                    General Requirements
                </h3>
            </div>
            <form @submit.prevent="handleSubmit">
                <div class="grid grid-cols-2 gap-6 mb-4">
                    <div class="flex flex-col">
                        <label class="text-md text-gray-700">
                            Task Name
                        </label>
                        <input v-model="taskStore.task.name" type="text" class="border border-gray-300 rounded-md" placeholder="Task Name">
                    </div>
                    <!-- <div class="flex flex-col">
                        <label class="text-md text-gray-700">
                            Total Cost
                        </label>
                        <input v-model="taskStore.task.amount" type="text" class="border border-gray-300 rounded-md" placeholder="0.00">
                    </div> -->
                </div>
                <!-- <div class="grid grid-cols-2 gap-6 mb-4">
                    <div class="flex flex-col">
                        <label class="text-md text-gray-700">
                            Quantity
                        </label>
                        <input v-model="taskStore.task.quantity" type="text" class="border border-gray-300 rounded-md" placeholder="0.00">
                    </div>
                    <div class="flex flex-col">
                        <label class="text-md text-gray-700">
                            Unit
                        </label>
                        <input v-model="taskStore.task.unit" type="text" class="border border-gray-300 rounded-md" placeholder="0.00">
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-6 mb-4">
                    <div class="flex flex-col">
                        <label class="text-md text-gray-700">
                            Unit Price
                        </label>
                        <input v-model="taskStore.task.unit_price" type="text" class="border border-gray-300 rounded-md" placeholder="0.00">
                    </div>
                    <div class="flex flex-col">
                        <label class="text-md text-gray-700">
                            Amount
                        </label>
                        <input v-model="taskStore.task.amount" type="text" class="border border-gray-300 rounded-md" placeholder="0.00">
                    </div>
                </div> -->
                <div class="flex flex-col mb-4">
                    <label class="text-md text-gray-700">
                        Description
                    </label>
                    <textarea v-model="taskStore.task.description" class="border border-gray-300 rounded-md w-full h-56 resize-none" />
                </div>
                <div class="flex justify-end">
                    <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-36 h-10" type="submit">
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    </ModalContainer>
</template>

<script lang="ts" setup>
import { useTaskStore } from "@/stores/project-monitoring/task"
const taskStore = useTaskStore()
defineProps({
    showModal: {
        type: Boolean,
        required: true,
        default: false
    }
})
const boardLoading = ref(false)
const snackbar = useSnackbar()
const handleSubmit = async () => {
    try {
        boardLoading.value = true
        await taskStore.createTask()
        if (taskStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: taskStore.errorMessage
            })
        } else {
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
    }
}
const emit = defineEmits(["hideModal"])
</script>

<style>

</style>
