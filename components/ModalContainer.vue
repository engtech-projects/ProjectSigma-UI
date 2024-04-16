<script lang="ts" setup>
import { useModalStore } from "~/stores/modal"
const modalStore = useModalStore()
const emit = defineEmits(["hide"])
const props = defineProps({
    size: {
        type: String,
        default: "modal-md"
    },
    title: {
        type: String,
        default: ""
    },
    header: {
        type: Boolean,
        default: true
    },
    local: {
        type: Boolean,
        default: false
    },
    show: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
})

const showModal = computed(() => {
    return props.local ? props.show : modalStore.show
})

const hideModal = () => {
    props.local ? emit("hide") : modalStore.hideModal()
}

</script>

<template>
    <div v-if="showModal" class="fixed left-0 bottom-0 w-screen h-screen bg-black/50 z-[9999] flex items-center justify-center">
        <div v-if="loading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center z-50">
            <img
                class="flex justify-center w-28 rounded-md"
                src="/loader.gif"
                alt="logo"
            >
        </div>
        <div :class="props.size" class="min-h-48 bg-white rounded flex flex-col text-slate-700">
            <div v-if="props.header" class="header border-b px-4 h-12 flex items-center w-full justify-between">
                <h1 class="text-l font-bold">
                    {{ props.title }}
                </h1>
                <div class="actions">
                    <Icon name="iconoir:xbox-x" class="text-2xl text-slate-600 hover:text-orange-500 cursor-pointer" @click.prevent="hideModal" />
                </div>
            </div>
            <div class="body p-4">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal-xs {
        width: 20rem
    }
    .modal-sm {
        width: 30rem
    }
    .modal-md {
        width: 40rem
    }
    .modal-lg {
        width: 50rem
    }
    .modal-xl {
        width: 60rem
    }
    .modal-xxl {
        width: 72rem
    }
</style>
