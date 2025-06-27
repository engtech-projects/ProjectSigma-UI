<script setup>
defineProps({
    print: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(["changePrint"])
const changePrint = () => {
    emit("changePrint")
}
</script>
<template>
    <div class="flex justify-end py-4">
        <button v-if="!print" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-12 h-8" @click="changePrint">
            <Icon name="ic:outline-local-printshop" class="text-white h-6 w-6" />
        </button>
        <button v-else class="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 select-none text-white rounded-lg text-sm px-4 py-2" @click="changePrint">
            Hide Print Layout
        </button>
    </div>
</template>
