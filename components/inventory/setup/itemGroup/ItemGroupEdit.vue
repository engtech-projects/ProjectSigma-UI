<script setup lang="ts">
defineProps({
    name: {
        type: String,
        required: false,
        default: "",
    },
    subGroups: {
        type: Array,
        required: false,
        default: null,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    action: {
        type: Function,
        default: null
    },
    subaction: {
        type: Function,
        default: null
    }
})

const updateItemGroup = () => {
    return ""
}

const cancelUpdateItemGroup = () => {
    return ""
}

</script>
<template>
    <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-col">
            <div class="flex flex-row justify-center gap-1">
                <div class="flex flex-col">
                    <input
                        type="text"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                    >
                    <div class="addSubItem">
                        <template v-for="(wrk, index) in subGroups" :key="index">
                            <div class="subItem">
                                <div class="pl-12 flex flex-row">
                                    <div class="itemText">
                                        <input
                                            v-model="wrk"
                                            type="text"
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                        >
                                    </div>
                                    <div class="cancel-control">
                                        <button class="text-red-700 font-medium rounded-lg text-lg hover:text-white hover:bg-red-700 px-2 py-1" @click="removeSubItemGroup(index)">
                                            <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <button class="bg-transparent text-xs text-left mb-4" @click="subaction()">
                            + Add Sub Group
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </td>
    <td class="flex flex-row justify-center items-center px-2 font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="save-control">
            <button class="text-emerald-700 font-medium rounded-lg text-lg hover:text-white hover:bg-emerald-700 px-2 py-1" @click="updateItemGroup">
                <Icon name="mdi:plus" class="h-5 w-5 lg:h-5 lg:w-5" />
            </button>
        </div>
        <div class="cancel-control">
            <button
                class="text-red-700 font-medium rounded-lg text-lg hover:text-white hover:bg-red-700 px-2 py-1"
                @click="cancelUpdateItemGroup"
            >
                <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
            </button>
        </div>
    </td>
</template>
