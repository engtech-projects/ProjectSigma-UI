<script setup lang="ts">
defineProps({
    data: {
        type: Object,
        required: true,
    },
    listPss: {
        type: Array,
        required: true,
    }
})
const isSet = ref(true)
const doSet = () => {
    isSet.value = false
}
const addPSS = () => {
    listPss.value.push(
        {
            id: null
        }
    )
}
const hideSet = () => {
    isSet.value = true
}
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
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-col gap-4">
                            <div class="flex flex-row gap-2 justify-start items-center">
                                <label for="">PSS: Lorem Manager {{ data.pss }} </label>
                                <div v-if="isSet" class="flex flex-row">
                                    <button class="px-3 py-1 bg-purple-600 text-white text-xs font-bold" @click="doSet">
                                        SET
                                    </button>
                                </div>
                                <div v-else class="flex flex-row gap-2 justify-start items-center">
                                    <button class="px-3 py-1 bg-green-600 text-white text-xs font-bold">
                                        SAVE
                                    </button>
                                    <button class="px-3 py-1 bg-red-600 text-white text-xs font-bold" @click="hideSet">
                                        CANCEL
                                    </button>
                                </div>
                            </div>
                            <div v-show="!isSet" class="flex flex-row gap-1 justify-start items-center">
                                <label for="">PSS:</label>
                                <div>
                                    <button class="px-3 py-1 bg-green-600 text-white text-xs font-bold" @click="addPSS">
                                        +
                                    </button>
                                </div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <template v-for="item in listPss" :key="item.value">
                                    <div class="flex flex-row justify-between gap-4">
                                        {{ item }}
                                        <!-- <HrmsCommonUserEmployeeSelector v-model="listPss[index].id" class="w-full" /> -->
                                        <div class="flex flex-row gap-2">
                                            <button class="px-3 py-1 bg-red-600 text-white text-xs font-bold">
                                                -
                                            </button>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row">
                        <label for="">Project Code / Department : {{ data.project_code }} </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
