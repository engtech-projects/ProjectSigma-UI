<script setup>
defineProps({
    label: {
        type: String,
        required: false,
        default: "Project Information",
    },
    code: {
        type: String,
        required: false,
        default: null,
    },
    name: {
        type: String,
        required: false,
        default: null,
    },
    location: {
        type: String,
        required: false,
        default: null,
    },
    license: {
        type: String,
        required: false,
        default: null,
    },
    stageStatus: {
        type: String,
        required: false,
        default: null,
    },
})
</script>
<template>
    <div>
        <div class="w-full flex items-center justify-center">
            <div>
                <h1 class="text-2xl text-center uppercase font-bold">
                    {{ license }}
                </h1>
            </div>
        </div>
        <div class="flex flex-col gap-3">
            <div class="flex items-first gap-1">
                <h1 class="text-black uppercase font-semibold">
                    {{ label }}
                </h1>
            </div>
            <div class="flex flex-col mb-8">
                <div class="flex items-start gap-4">
                    <span class="text-gray-500 uppercase w-[140px] text-text-left block font-medium whitespace-nowrap">
                        Contract ID:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        {{ code ?? "No project yet." }}
                    </span>
                </div>
                <div class="flex items-end gap-4">
                    <span class="text-gray-500 uppercase w-[140px] text-text-left whitespace-nowrap">
                        Contract Name:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        {{ name }}
                    </span>
                </div>
                <div class="flex items-end gap-4">
                    <span class="text-gray-500 uppercase w-[140px] text-text-left">
                        Location:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        {{ location }}
                    </span>
                </div>
                <div v-if="stageStatus" class="flex items-center gap-4">
                    <span class="text-gray-500 uppercase w-[140px] text-text-left">
                        Stage Status:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        {{ stageStatus }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
