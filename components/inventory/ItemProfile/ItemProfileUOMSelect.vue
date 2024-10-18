<script lang="ts" setup>
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"
const profileStore = useItemProfileStore()
const { uom, uomVolume, uomLength, uomWeight, uomArea, uomForce, uomDimension, uomCustom } = storeToRefs(profileStore)
const compId = useId()
const model = defineModel({ required: false, type: String, default: null })
defineProps({
    title: {
        type: String,
        default: "",
    },
    addClass: {
        type: String,
        default: "",
    },
})
const AllTypes = ref({
    lengthType: {
        name: "Length",
        value: uomLength,
    },
    weightType: {
        name: "Weight",
        value: uomWeight,
    },
    volumeType: {
        name: "Volume",
        value: uomVolume,
    },
    areaType: {
        name: "Area",
        value: uomArea,
    },
    forceType: {
        name: "Force",
        value: uomForce,
    },
    dimensionType: {
        name: "Dimension",
        value: uomDimension,
    },
    customType: {
        name: "Custom",
        value: uomCustom,
    },
})
function selectOption (option: any) {
    model.value = option
    const dom = document.getElementById(compId)
    dom?.click()
}
const getTypeUOM = (id:any) => {
    if (uom.value.length >= 1) {
        const symbol = uom.value.map((data: any) => {
            return data.id === id ? data.name : null
        }).filter((num:any): num is number => num !== null)
        return symbol ? symbol[0] : null
    }
    return null
}

</script>
<template>
    <div v-if="AllTypes" class="PsSelectInput">
        <button :id="compId" :data-dropdown-toggle="'uom_dropdown-'+compId" class="h-full min-w-48 inline-flex items-center px-3.5 py-2 text-sm font-medium text-center text-gray-900 bg-white border" type="button">
            {{ model ? getTypeUOM(model) : "Select UOM" }}
        </button>
        <div :id="'uom_dropdown-'+compId" class="z-50 hidden bg-white divide-y divide-gray-400 rounded-lg shadow w-44 overflow-y-auto max-h-60">
            <ul v-for="data in AllTypes" :key="'uom-'+data" class="py-2 text-sm text-gray-700" aria-labelledby="dropdownMenuIconButton">
                <li>
                    <div class="text-left px-2">
                        {{ data.name }}
                    </div>
                </li>
                <li v-for="item in data.value" :key="'uom-item-'+item">
                    <div class="block px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="selectOption(item.id)">
                        {{ item.name }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div v-else class="PsSelectInput">
        <select
            v-model="model"
            class="bg-gray-80 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block"
        >
            <option>
                No Data
            </option>
        </select>
    </div>
</template>
