<script setup>
import { storeToRefs } from "pinia"
// import { useUOM, UOM_STANDARD, UOM_CUSTOM } from "@/stores/inventory/setup/uom"
import { useUOM } from "@/stores/inventory/setup/uom"

const main = useUOM()
const { uom, errorMessage, successMessage } = storeToRefs(main)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const addUOM = async () => {
    try {
        boardLoading.value = true
        await main.addUOM()
        if (main.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: errorMessage.value
            })
        } else {
            snackbar.add({
                type: "success",
                text: successMessage.value
            })
            await main.getUOMCustom()
            await main.getUOMStandard()
        }
    } catch {
        snackbar.add({
            type: "error",
            text: errorMessage.value
        })
    } finally {
        main.clearMessages()
        boardLoading.value = false
    }
}
</script>

<template>
    <LayoutBoards title="Unit of Measurement" :loading="boardLoading">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="addUOM">
                <label
                    class="text-sm"
                >Add UOM Record</label>
                <div class="mb-2">
                    <label
                        for="name"
                        class="text-sm italic"
                    >Name</label>
                    <input
                        id="name"
                        v-model="uom.name"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div class="mb-2">
                    <label
                        for="symbol"
                        class="text-sm italic"
                    >Symbol</label>
                    <input
                        id="symbol"
                        v-model="uom.symbol"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        Add UOM
                    </button>
                </div>
            </form>
            <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class="success-message text-green-600 text-center font-semibold italic"
            >
                {{ successMessage }}
            </p>
        </div>
    </LayoutBoards>
</template>

<style scoped>
.error-message,
.success-message {
    transition: opacity 0.5s ease-out;
}

.fade-out {
    opacity: 0;
}
</style>
