<script setup>
import { storeToRefs } from "pinia"
import { useUOM } from "@/stores/inventory/setup/uom"

const main = useUOM()
const { uom, errorMessage, successMessage } = storeToRefs(main)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const cancelEdit = () => {
    main.reset()
}
const doEditUOM = async () => {
    try {
        boardLoading.value = true
        await main.editUOM()
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
            text: errorMessage.value || "something went wrong."
        })
    } finally {
        main.clearMessages()
        boardLoading.value = false
    }
}

</script>

<template>
    <LayoutEditBoards title="Unit of Measurement" :loading="boardLoading">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="doEditUOM">
                <label
                    class="text-sm"
                >Edit UOM Record</label>
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
                <div class="flex justify-end gap-2">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        class="flex-1 text-white p-2 rounded bg-gray-700 content-center mt-5 hover:bg-gray-500"
                        @click="cancelEdit"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            <p hidden class="text-red-600 text-center font-semibold">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class="text-green-600 text-center font-semibold"
            >
                {{ successMessage }}
            </p>
        </div>
    </LayoutEditBoards>
</template>
