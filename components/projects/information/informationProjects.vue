<template>
    <div>
        <div class="flex items-end gap-1 mb-8">
            <h1 class="text-2xl text-black uppercase font-semibold">
                {{ headerTitle }}
            </h1>
        </div>
        <div class="flex flex-col gap-3 mb-8">
            <div class="flex items-end gap-3">
                <span class=" text-gray-500 uppercase w-[140px] text-right">
                    Project Id:
                </span>
                <span class="text-black text-md uppercase flex-1 font-semibold">
                    {{ information.code ?? "No project Code Yet" }}
                </span>
            </div>
            <div class="flex items-end gap-3">
                <span class=" text-gray-500 uppercase w-[140px] text-right">
                    Contract Name:
                </span>
                <span class="text-black text-md uppercase flex-1 font-semibold">
                    {{ information.name }}
                </span>
            </div>
            <div class="flex items-end gap-3">
                <span class=" text-gray-500 uppercase w-[140px] text-right">
                    Location:
                </span>
                <span class="text-black text-md uppercase flex-1 font-semibold">
                    {{ information.location }}
                </span>
            </div>
        </div>
        <h1>
            {{ projectDetails }}
        </h1>
    </div>
</template>
<script setup>
defineProps({
    headerTitle: {
        type: String,
        default: ""
    },
    projectDetails: {
        type: String,
        default: () => ""
    },
    information: {
        type: Object,
        default: () => ({})
    }
})
</script>
