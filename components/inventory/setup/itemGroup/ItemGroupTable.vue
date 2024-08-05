<script setup lang="ts">
import { useItemStore } from "@/stores/inventory/setup/itemgroup"
const itemStore = useItemStore()
const { list: itemLis, subitemgroup, getParams, itemgroup, edititemgroup, errorMessage, successMessage, pagination } = storeToRefs(itemStore)

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
const editIdItem = ref()
const editName = ref("")
const showAppend = ref(false)
const showEdit = ref(false)
const boardLoading = ref(false)
const snackbar = useSnackbar()
const addItemGroup = async (nameItem: any) => {
    showAppend.value = false
    const newSubItemGroup: any[] = []
    subitemgroup.value.forEach((element) => {
        newSubItemGroup.push(element.name)
    })
    itemgroup.value.name = nameItem
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
}

const updateItemGroup = async (nameItem: any) => {
    const newSubItemGroup: any[] = []
    edititemgroup.value.forEach((element) => {
        newSubItemGroup.push(element.name)
    })
    itemgroup.value.name = nameItem
    itemgroup.value.sub_groups = newSubItemGroup
    edititemgroup.value = []
    showEdit.value = false
    await itemStore.updateItemGroup(editIdItem.value)
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
}

const showItemGroup = () => {
    showAppend.value = true
}
const hideItemGroup = () => {
    showAppend.value = false
    subitemgroup.value = []
}
const showEditItemGroup = (data: any, getname: string, id: number) => {
    editIdItem.value = id
    showEdit.value = true
    edititemgroup.value = []
    editName.value = getname
    data.forEach((element:any) => {
        edititemgroup.value.push({ name: element })
    })
}
const hideEditItemGroup = () => {
    edititemgroup.value = []
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
                        <InventoryCommonTableItemAppend :subitemholder="subitemgroup" @add-item="addItemGroup" @hide-item="hideItemGroup" />
                    </tr>
                    <template v-if="showEdit">
                        <tr class="bg-white border-b">
                            <InventorySetupItemGroupEdit :nameholder="editName" :subitemgroup="edititemgroup" @update-itemgroup="updateItemGroup" @hide-edit="hideEditItemGroup" />
                        </tr>
                    </template>
                    <tr v-for="dataValue, index in itemLis" :key="index" class="bg-white border-b">
                        <template v-if="!showEdit">
                            <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-start">
                                <div class="flex flex-col gap-1 my-2" data-accordion="collapse">
                                    <div class="text-lg flex flex-row gap-1 items-center">
                                        <Icon
                                            v-show="dataValue.expand"
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
                                            v-show="!dataValue.expand"
                                            :id="index"
                                            :key="String(index)+'plus'"
                                            name="mdi:plus"
                                            class="cursor-pointer h-5 w-5 lg:h-5 lg:w-5"
                                            :data-accordion-target="'#acbody-' + String(index)"
                                            aria-expanded="true"
                                            :aria-controls="'#acbody-' + String(index)"
                                            @click="checkElement($event)"
                                        />
                                        <p class="text-sm">
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
                                    @click="showEditItemGroup(dataValue.sub_groups, dataValue.name, dataValue.id)"
                                >
                                    <Icon name="mdi:pencil" class="h-5 w-5 lg:h-5 lg:w-5" />
                                </button>
                            </td>
                        </template>
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
    </InventorySetupItemGroupLayoutBoards>
</template>
