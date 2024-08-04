<script setup lang="ts">
import { useItemStore } from "@/stores/inventory/setup/itemgroup"
const itemStore = useItemStore()
const { list: itemLis, subitemgroup, itemgroup } = storeToRefs(itemStore)

interface HeaderColumn {
    name: string,
    id: string,
    style: string
}

defineProps({
    headerColumns: {
        type: Array<HeaderColumn>,
        required: true,
    },
    datas: {
        type: Array<any>,
        required: true,
    },
    actions: {
        type: Object,
        required: false,
        default: null,
    },
})

const showAppend = ref(false)
const editItemGroup = ref(false)
const boardLoading = ref(false)
const addItemGroup = async (nameItem: any) => {
    showAppend.value = false
    const newSubItemGroup = []
    subitemgroup.value.forEach((element) => {
        newSubItemGroup.push(element.name)
    })
    itemgroup.value.name = nameItem
    itemgroup.value.sub_groups = newSubItemGroup
    await itemStore.createItemGroup()
    await itemStore.getItemGroups()
}

const hideItemGroup = () => {
    showAppend.value = false
    subitemgroup.value = []
}
const showItemGroup = () => {
    showAppend.value = true
}
const showEditItemGroup = () => {
    editItemGroup.value = true
}

const checkElement = (e: any, items: any) => {
    const getId = e.target.id
    if (items[getId]) {
        if (items[getId].expand) {
            items[getId].expand = false
        } else {
            items[getId].expand = true
        }
    }
}
</script>
<template>
    <InventorySetupItemGroupLayoutBoards title="Item Group" class="w-full" :loading="boardLoading" :action="showItemGroup">
        <div class="pb-2 text-gray-500">
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <InventoryCommonTableItemTh title="Items" />
                        <InventoryCommonTableItemTh title="Actions" />
                    </tr>
                </thead>
                <tbody>
                    <tr v-show="showAppend" class="border-b-2 border-gray-300">
                        <InventoryCommonTableItemAppend @addItem="addItemGroup" @hideItem="hideItemGroup" :subitemholder="subitemgroup" />
                    </tr>
                    <tr v-for="dataValue, index in itemLis" :key="index" class="bg-white border-b">
                        <template v-if="editItemGroup">
                            <InventorySetupItemGroupEdit />
                        </template>
                        <template v-else>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                <div class="flex flex-col gap-1 my-2" data-accordion="collapse">
                                    <div class="text-lg flex flex-row gap-1 items-center">
                                        <Icon
                                            v-show="dataValue.expand"
                                            :id="index"
                                            :key="index"
                                            name="mdi:minus"
                                            class="h-5 w-5 lg:h-5 lg:w-5"
                                            :data-accordion-target="'#acbody-' + String(index)"
                                            aria-expanded="true"
                                            :aria-controls="'#acbody-' + String(index)"
                                            @click="checkElement($event, itemLis)"
                                        />
                                        <Icon
                                            v-show="!dataValue.expand"
                                            :id="index"
                                            :key="String(index)+'plus'"
                                            name="mdi:plus"
                                            class="h-5 w-5 lg:h-5 lg:w-5"
                                            :data-accordion-target="'#acbody-' + String(index)"
                                            aria-expanded="true"
                                            :aria-controls="'#acbody-' + String(index)"
                                            @click="checkElement($event, itemLis)"
                                        />
                                        <p class="text-sm">
                                            {{ dataValue.name }}
                                        </p>
                                    </div>
                                    <div
                                        :id="'acbody-' + String(index)"
                                        :key="index"
                                        class="hidden flex flex-col ps-7 text-sm relative before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100"
                                        :aria-labelledby="'acbody-' + String(index)"
                                    >
                                        <span v-for="subData, subIndex in dataValue.sub_groups" :key="subIndex" class="flex flex-row gap-1">
                                            <Icon name="mdi:minus" class="h-5 w-5 lg:h-5 lg:w-5" />
                                            <p class="text-sm">
                                                {{ subData }}
                                            </p>
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                                <button
                                    class="text-blue-500 bg-transparent font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                    @click="showEditItemGroup"
                                >
                                    <Icon name="mdi:pencil" class="h-5 w-5 lg:h-5 lg:w-5" />
                                </button>
                            </td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </InventorySetupItemGroupLayoutBoards>
</template>
