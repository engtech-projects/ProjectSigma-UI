<script setup lang="ts">
defineProps({
    subitemholder: {
        type: Array,
        required: true,
    },
})
const nameholder = ref("")
const emit = defineEmits(["addItem", "hideItem"])
const doAddItem = (name: any) => {
    emit("addItem", name)
}
const doHideItem = () => {
    emit("hideItem")
}
const addSub = (data: any) => {
    data.push({ name: "" })
}
const removeSub = (id: number, item: any) => {
    item.splice(id, 1)
}
</script>
<template>
    <td class="p-3 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-col">
            <div class="flex flex-row justify-start w-full gap-1">
                <div class="flex flex-col w-full">
                    <div class="w-full flex flex-row gap-2 items-center py-2">
                        <label for="new-item" class="text-xs font-bold m-0 p-0">New Item :</label>
                        <input
                            v-model="nameholder"
                            type="text"
                            class="block p-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-600 m-0"
                        >
                    </div>
                    <template v-for="(item, index) in subitemholder" :key="index">
                        <div class="subItem w-full">
                            <div class="pl-12 flex flex-row">
                                <div class="w-full flex flex-row gap-2 items-center py-2">
                                    <label for="new-item" class="text-xs font-bold m-0 p-0">Sub Item :</label>
                                    <input
                                        v-model="item.name"
                                        type="text"
                                        class="block p-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-600 m-0"
                                    >
                                </div>
                                <div class="cancel-control flex items-center">
                                    <button class="text-red-700 font-medium rounded-lg text-lg hover:text-white hover:bg-red-700 px-2" @click="removeSub(index, subitemholder)">
                                        <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="flex flex-row justify-end mt-4">
                        <button class="bg-emerald-800 px-2 py-1 text-white text-xs text-left mb-4" @click="addSub(subitemholder)">
                            <Icon name="mdi:plus" class="h-5 w-5 lg:h-5 lg:w-5" /> Sub Group
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </td>
    <td class="flex flex-row justify-center items-center px-2 font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="save-control">
            <button class="text-emerald-700 font-medium rounded-lg text-lg hover:text-white hover:bg-emerald-700 px-2 py-1" @click="doAddItem(nameholder)">
                <Icon name="mdi:plus" class="h-5 w-5 lg:h-5 lg:w-5" />
            </button>
        </div>
        <div class="cancel-control">
            <button
                class="text-red-700 font-medium rounded-lg text-lg hover:text-white hover:bg-red-700 px-2 py-1"
                @click="doHideItem"
            >
                <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
            </button>
        </div>
    </td>
</template>
