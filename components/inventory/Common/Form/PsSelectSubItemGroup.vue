<script lang="ts" setup>
import { useInventoryEnumsStore } from "@/stores/inventory/enum"
const enums = useInventoryEnumsStore()
const { itemGroupEnum } = storeToRefs(enums)
const compId = useId()
const model = defineModel({ required: true, type: String, default: null })
const props = defineProps({
    itemGroup: {
        type: Object,
        required: true,
    },
})
onMounted(() => {
    if (!itemGroupEnum.value.isLoaded) {
        enums.getItemGroups()
    }
})
const subItemGroup = computed(() => {
    return itemGroupEnum.value.list.find(function (itg: any) {
        return itg.name === props.itemGroup
    })
})
</script>
<template>
    <div v-if="itemGroupEnum.isLoaded" class="PsSelectInput">
        <select
            :id="compId"
            v-model="model"
            class="w-[120px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block"
        >
            <option
                v-for="option, i in subItemGroup?.sub_groups"
                :key="i"
                :value="option"
            >
                {{ option }}
            </option>
        </select>
    </div>
    <div v-else class="PsSelectInput">
        <select
            v-model="model"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block"
        >
            <option>
                No Data
            </option>
        </select>
    </div>
</template>
