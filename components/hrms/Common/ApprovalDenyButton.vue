<script setup>
const props = defineProps({
    requestId: {
        type: Number,
        required: true,
    }
})
const denyRemarks = defineModel("denyRemarks", { required: true, type: String, default: null })
const emit = defineEmits(["approve", "deny", "clear"])
const approveRequest = () => {
    emit("approve", props.requestId)
}
const denyRequest = () => {
    emit("deny", props.requestId)
}
const clearRemarks = () => {
    denyRemarks.value = ""
}
</script>
<template>
    <button
        class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
        @click="approveRequest()"
    >
        Approve Request
    </button>
    <button
        data-popover-target="popover-deny"
        class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
    >
        Deny Request
    </button>
    <div id="popover-deny" data-popover role="tooltip" class="absolute z-10 invisible inline-block md:w-96 w-full text-sm text-gray-500 transition-opacity duration-300 bg-gray-800 border border-gray-200 shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 p-4">
        <div>
            <div>
                <div class="w-full">
                    <p class="text-md">
                        Are you sure you want to deny this request?
                    </p>
                </div>
                <div class="py-2 flex-col flex gap-2">
                    <label for="deny-remarks">Reason for Denial</label>
                    <textarea v-model="denyRemarks" cols="2" rows="2" />
                </div>
                <div class="w-full py-2 flex gap-2 justify-end">
                    <button
                        class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                        @click="denyRequest()"
                    >
                        Deny Request
                    </button>
                    <button
                        class="bg-yellow-600 p-2 hover:bg-yellow-900 text-white round-sm"
                        @click="clearRemarks"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
        <div data-popper-arrow />
    </div>
</template>
