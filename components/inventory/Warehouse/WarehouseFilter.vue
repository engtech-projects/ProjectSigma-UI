<script setup lang="ts">
defineProps({
    data: {
        type: Object,
        required: true,
    }
})
</script>
<template>
    <div class="h-full w-full">
        <div class="flex flex-col gap-2 w-full border-2 border-solid border-gray-800 rounded-t">
            <div id="headline mb-4">
                <div class="w-full bg-gray-900 basis-[10%] grow-1 shrink-0 flex flex-row justify-between items-center border-b py-2 px-4">
                    <div class="flex flex-row gap-2 items-center justify-center">
                        <h3 class="text-lg font-bold text-white">
                            Warehouse Overview
                        </h3>
                    </div>
                </div>
            </div>
            <div id="warehouse-overview" class="p-4">
                <div class="flex flex-col gap-4 mb-5">
                    <div class="flex flex-row">
                        <label for="">Warehouse Name: {{ data.name }} </label>
                    </div>
                    <div class="flex flex-row">
                        <label for="">Location: {{ data.location }} </label>
                    </div>
                    <div class="flex flex-row">
                        <label for="">PSS: {{ data.pss }} </label>
                    </div>
                    <div class="flex flex-row">
                        <label for="">Project Code / Department : {{ data.project_code }} </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
