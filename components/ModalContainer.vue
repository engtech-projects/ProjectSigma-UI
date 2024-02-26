<script lang="ts" setup>
import { useModalStore } from "~/stores/modal"
const modalStore = useModalStore()
const props = defineProps({
    size: {
        type: String,
        default: "modal-md"
    },
    title: {
        type: String,
        default: ""
    },
})

</script>

<template>
    <div v-if="modalStore.show" class="fixed left-0 bottom-0 w-screen h-screen bg-black/50 z-[9999] flex items-center justify-center">
        <div :class="props.size" class="min-h-48 bg-white rounded flex flex-col text-slate-700">
            <div class="header border-b px-4 h-12 flex items-center w-full justify-between">
                <h1 class="text-l font-bold">
                    {{ props.title }}
                </h1>
                <div class="actions">
                    <Icon name="iconoir:xbox-x" class="text-2xl text-slate-600 hover:text-orange-500 cursor-pointer" @click.prevent="modalStore.hideModal" />
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
    .modal-l {
        width: 50rem
    }
    .modal-xl {
        width: 60rem
    }
    .modal-xxl {
        width: 72rem
    }
</style>
