<script setup lang="ts">
import { useItemStore } from "@/stores/inventory/setup/itemgroup"
const itemStore = useItemStore()
const { list: itemLis, subitemgroup, getParams, itemgroup, errorMessage, successMessage, pagination } = storeToRefs(itemStore)

defineProps({
    actions: {
        type: Object,
        required: false,
        default: null,
    },
})
const changePaginate = (newParams: any) => {
    getParams.value.page = newParams.page ?? ""
}
const showAppend = ref(false)
const showEdit = ref(false)
const boardLoading = ref(false)
const snackbar = useSnackbar()

const addItemGroup = async (name: any) => {
    showAppend.value = false
    const newSubItemGroup: any[] = []
    subitemgroup.value.forEach((element) => {
        newSubItemGroup.push(element.name)
    })
    itemgroup.value.name = name
    itemgroup.value.sub_groups = newSubItemGroup
    await itemStore.createItemGroup()
    await itemStore.getItemGroups()

    if (errorMessage.value !== "") {
        snackbar.add({
            type: "error",
            text: errorMessage.value
        })
    } else {
        snackbar.add({
            type: "success",
            text: successMessage.value
        })
    }
    subitemgroup.value = []
}

const updateItemGroup = async (id: number, name: string, group: any) => {
    const newSubItemGroup: any[] = []
    group.forEach((element) => {
        newSubItemGroup.push(element.name)
    })
    itemgroup.value.name = name
    itemgroup.value.sub_groups = newSubItemGroup
    showEdit.value = false
    await itemStore.updateItemGroup(id)

    if (errorMessage.value !== "") {
        snackbar.add({
            type: "error",
            text: errorMessage.value
        })
    } else {
        snackbar.add({
            type: "success",
            text: successMessage.value
        })
        itemLis.value.map(function (itemname: any) {
            if (itemname.id === id) {
                itemname.name = name
                itemname.sub_groups = newSubItemGroup
                itemname.edit = false
            }
            return itemname
        })
        itemgroup.value = {}
    }
}

const showItemGroup = () => {
    showAppend.value = true
}
const hideItemGroup = () => {
    showAppend.value = false
    subitemgroup.value = []
}
const showEditItemGroup = async (index: number) => {
    const getItem = await itemLis.value[index]
    if (getItem) {
        if (itemLis.value[index].edit) {
            itemLis.value[index].edit = false
        } else {
            itemLis.value[index].edit = true
        }
    }
    showEdit.value = true
}
const hideEditItemGroup = (index: any) => {
    index.edit = false
    showEdit.value = false
}

const checkElement = async (e: any) => {
    const getId = e.target.id
    const getItem = await itemLis.value[getId]

    if (getItem) {
        if (itemLis.value[getId].expand) {
            itemLis.value[getId].expand = false
        } else {
            itemLis.value[getId].expand = true
        }
    }
}
</script>
<template>
    <InventoryCommonLayoutInventoryBoards title="Item Group" class="w-full" :loading="boardLoading" @action="showItemGroup">
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
                        <InventoryCommonTableItemAppend :subitemholder="subitemgroup" @add-item="addItemGroup" @hide-item="hideItemGroup" />
                    </tr>
                    <tr v-for="dataValue, index in itemLis" :key="index" class="bg-white border-b">
                        <template v-if="dataValue.edit">
                            <InventorySetupItemGroupEdit :data="dataValue" @update-itemgroup="updateItemGroup" @hide-edit="hideEditItemGroup(dataValue)" />
                        </template>
                        <td v-if="!dataValue.edit" class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                            <div class="flex flex-col gap-1 my-2" data-accordion="collapse">
                                <div class="text-lg flex flex-row gap-1 items-center">
                                    <Icon
                                        v-show="!dataValue.expand"
                                        :id="index"
                                        :key="index"
                                        name="mdi:minus"
                                        class="cursor-pointer h-5 w-5 lg:h-5 lg:w-5"
                                        :data-accordion-target="'#acbody-' + String(index)"
                                        aria-expanded="true"
                                        :aria-controls="'#acbody-' + String(index)"
                                        @click="checkElement($event)"
                                    />
                                    <Icon
                                        v-show="dataValue.expand"
                                        :id="index"
                                        :key="String(index)+'plus'"
                                        name="mdi:plus"
                                        class="cursor-pointer h-5 w-5 lg:h-5 lg:w-5"
                                        :data-accordion-target="'#acbody-' + String(index)"
                                        aria-expanded="true"
                                        :aria-controls="'#acbody-' + String(index)"
                                        @click="checkElement($event)"
                                    />
                                    <p class="text-md">
                                        {{ dataValue.name }}
                                    </p>
                                </div>
                                <div
                                    :id="'acbody-' + String(index)"
                                    :key="index"
                                    class="hidden flex flex-col ps-7 text-sm relative before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-gray-200"
                                    :aria-labelledby="'acbody-' + String(index)"
                                >
                                    <span v-for="subData, subIndex in dataValue.sub_groups" :key="subIndex" class="flex flex-row gap-1">
                                        <p class="text-sm">
                                            {{ subData }}
                                        </p>
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td v-if="!dataValue.edit" class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                            <button
                                class="text-blue-500 bg-transparent font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                @click="showEditItemGroup(index)"
                            >
                                <Icon name="ion:pencil" class="h-5 w-5 lg:h-5 lg:w-5" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination
                v-if="itemLis.length"
                :links="pagination"
                @change-params="changePaginate"
            />
        </div>
    </InventoryCommonLayoutInventoryBoards>
</template>
