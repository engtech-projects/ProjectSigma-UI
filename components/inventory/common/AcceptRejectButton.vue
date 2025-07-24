<script setup>

const props = defineProps({
    requestId: {
        type: Number,
        required: true,
    },
    maxQuantity: {
        type: Number,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
const rejectRemarks = ref("")
const acceptRemarks = ref("")
const emit = defineEmits(["acceptAll", "accept", "reject"])
const quantity = defineModel("quantity", {
    type: Number,
    default: null
})

const acceptPopoverId = computed(() => `popover-accept-${props.requestId}`)
const rejectPopoverId = computed(() => `popover-reject-${props.requestId}`)

const acceptAll = () => {
    emit("acceptAll", { requestId: props.requestId })
    clearRemarks()
}

const acceptWithDetails = () => {
    emit("accept", { requestId: props.requestId, remarks: acceptRemarks.value })
    clearRemarks()
}

const rejectRequest = () => {
    emit("reject", { requestId: props.requestId, remarks: rejectRemarks.value })
    clearRemarks()
}

const clearRemarks = () => {
    rejectRemarks.value = ""
    acceptRemarks.value = ""
}

const setMaxQuantity = () => {
    quantity.value = props.maxQuantity
}
</script>

<template>
    <div class="flex items-center gap-2">
        <div class="flex items-center">
            <button
                class="bg-green-600 p-2 hover:bg-green-900 text-white rounded-l-lg border-r border-green-700"
                :disabled="props.disabled"
                @click="acceptAll"
            >
                Accept All
            </button>

            <button
                :data-popover-target="acceptPopoverId"
                class="bg-green-600 p-2 hover:bg-green-900 text-white rounded-r-lg"
                :disabled="props.disabled"
            >
                <div class="flex justify-center relative">
                    <Icon name="material-symbols-light:keyboard-arrow-up-rounded" class="h-6 w-6 text-white" />
                </div>
            </button>
            <div :id="acceptPopoverId" data-popover role="tooltip" class="absolute z-10 invisible inline-block md:w-96 w-full text-sm text-black transition-opacity duration-300 bg-gray-800 border border-gray-200 shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 p-4">
                <div>
                    <div>
                        <div class="py-2 flex-col flex gap-2 text-white">
                            <label for="accept-quantity">Quantity</label>
                            <div class="flex gap-2">
                                <input v-model.number="quantity" type="number" min="1" :max="maxQuantity" class="w-full p-1 text-black">
                                <button class="bg-green-600 p-1 hover:bg-green-900 text-white rounded-sm" @click="setMaxQuantity">
                                    Max
                                </button>
                            </div>
                            <label for="accept-remarks">Remarks</label>
                            <textarea v-model="acceptRemarks" cols="2" rows="2" class="w-full text-black" />
                        </div>
                        <div class="w-full py-2 flex gap-2 justify-end">
                            <button
                                class="bg-green-600 p-2 hover:bg-green-900 text-white rounded-sm"
                                :disabled="props.disabled"
                                @click="acceptWithDetails"
                            >
                                Accept
                            </button>
                            <button
                                class="bg-yellow-600 p-2 hover:bg-yellow-900 text-white rounded-sm"
                                @click="clearRemarks"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
                <div data-popper-arrow />
            </div>
        </div>

        <button
            :data-popover-target="rejectPopoverId"
            :disabled="props.disabled"
            class="bg-red-600 p-2 hover:bg-red-900 text-white rounded-lg"
        >
            Reject
        </button>
        <div :id="rejectPopoverId" data-popover role="tooltip" class="absolute z-10 invisible inline-block md:w-96 w-full text-sm text-white transition-opacity duration-300 bg-gray-800 border border-gray-200 shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 p-4">
            <div>
                <div>
                    <p class="text-md">
                        Are you sure you want to deny this request?
                    </p>
                    <div class="py-2 flex-col flex gap-2">
                        <label for="reject-remarks">Remarks</label>
                        <textarea v-model="rejectRemarks" cols="2" rows="2" class="w-full text-black" />
                    </div>
                    <div class="w-full py-2 flex gap-2 justify-end">
                        <button
                            class="bg-red-600 p-2 hover:bg-red-900 text-white rounded-sm"
                            :disabled="props.disabled"
                            @click="rejectRequest"
                        >
                            Reject
                        </button>
                        <button
                            class="bg-yellow-600 p-2 hover:bg-yellow-900 text-white rounded-sm"
                            @click="clearRemarks"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
            <div data-popper-arrow />
        </div>
    </div>
</template>
