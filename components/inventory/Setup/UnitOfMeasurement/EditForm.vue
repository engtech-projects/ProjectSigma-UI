<script setup>
import { storeToRefs } from "pinia"
import { useUOM } from "@/stores/inventory/setup/uom"

const main = useUOM()
const { uom, errorMessage, successMessage } = storeToRefs(main)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const cancelEdit = () => {
    uom.reset()
}
const editCont = async () => {
    try {
        boardLoading.value = true
        await uom.editUOM()
        snackbar.add({
            type: "success",
            text: uom.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: uom.errorMessage || "something went wrong."
        })
    } finally {
        uom.clearMessages()
        boardLoading.value = false
    }
}

</script>

<template>
    <LayoutEditBoards title="Edit Contribution" :loading="boardLoading">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="editCont">
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
                <div class="grid grid-rows-1 mb-2">
                    <label for="group_type" class="text-sm italic">Group Type</label>
                    <select
                        id="group_type"
                        v-model="uom.group_id"
                        class="bg-slate-100 border border-slate-300 rounded py-1.5 pl-3 cursor-pointer focus:outline focus:outline-color1 focus:bg-white"
                        required
                    >
                        <option value="" disabled selected>
                            Choose Group Type
                        </option>
                        <!-- <option v-for="shareType, index in SHARE_TYPES" :key="index" :value="shareType">
                            {{ shareType }}
                        </option> -->
                    </select>
                </div>
                <div class="grid grid-rows-1 mb-2">
                    <label for="type" class="text-sm italic">UOM Type</label>
                    <select
                        id="type"
                        v-model="uom.is_standard"
                        class="bg-slate-100 border border-slate-300 rounded py-1.5 pl-3 cursor-pointer focus:outline focus:outline-color1 focus:bg-white"
                        required
                    >
                        <option value="" disabled selected>
                            Choose UOM Type
                        </option>
                        <option value="0">
                            Custom
                        </option>
                        <option value="1">
                            Standard
                        </option>
                    </select>
                </div>
                <div class="flex justify-end">
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
