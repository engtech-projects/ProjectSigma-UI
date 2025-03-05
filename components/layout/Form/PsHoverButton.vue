<script setup>
const compId = useId()
defineProps({
    mainButtonTitle: {
        type: String,
        default: "Button"
    },
    mainButtonColor: {
        type: String,
        default: "bg-green-600"
    },
    secondaryTitle: {
        type: String,
        default: "Save Information"
    },
    secondaryButtonTitle: {
        type: String,
        default: "Save"
    },
    secondaryButtonColor: {
        type: String,
        default: "bg-green-600"
    },
    remarksTitle: {
        type: String,
        default: "Remarks"
    },
    showClear: {
        type: Boolean,
        default: true
    },
})
const remarks = defineModel("remarks", { required: true, type: String, default: null })
const emit = defineEmits(["click"])
const doClick = () => {
    emit("click")
}
const clear = () => {
    remarks.value = ""
}
</script>
<template>
    <button
        :data-popover-target="'popover' + compId"
        class="bg-green-600 p-2 hover:brightness-75 text-white round-sm"
        :class="mainButtonColor"
    >
        {{ mainButtonTitle }}
    </button>
    <div :id="'popover' + compId" data-popover role="tooltip" class="absolute z-10 invisible inline-block md:w-96 w-full text-sm text-gray-500 transition-opacity duration-300 bg-gray-800 border border-gray-200 shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 p-4">
        <div>
            <div>
                <div class="w-full">
                    <p class="text-md">
                        {{ secondaryTitle }}
                    </p>
                </div>
                <div class="py-2 flex-col flex gap-2">
                    <label for="deny-remarks">{{ remarksTitle }}</label>
                    <textarea v-model="remarks" cols="2" rows="2" maxlength="254" />
                </div>
                <div class="w-full py-2 flex gap-2 justify-end">
                    <button
                        class="p-2 hover:brightness-75 text-white round-sm"
                        :class="secondaryButtonColor"
                        @click="doClick()"
                    >
                        {{ secondaryButtonTitle }}
                    </button>
                    <button
                        v-if="showClear"
                        class="bg-yellow-600 p-2 hover:brightness-75 text-white round-sm"
                        @click="clear"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
        <div data-popper-arrow />
    </div>
</template>
