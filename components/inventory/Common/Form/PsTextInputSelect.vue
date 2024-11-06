<script lang="ts" setup>
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    options: {
        type: Array,
        default: null,
    },
    name: {
        type: String,
        required: false,
        default: "",
    },
    isStandard: {
        type: Boolean,
        required: true,
        default: true,
    },
    placeholder: {
        type: String,
        default: "",
    },
    required: {
        type: Boolean,
        default: false,
    },
    itemProfile: {
        type: Object,
        required: false,
        default () {
            return {}
        }
    },
})

const profileStore = useItemProfileStore()
const { uom } = storeToRefs(profileStore)
const isFocus = ref(false)
const compId = useId()
const model = defineModel({ required: true, type: String, default: "" })
const itemSuggest = ref([])

const getTypeUOM = (id:number) => {
    if (uom.value.length >= 1) {
        const symbol = uom.value.map((data: any) => {
            return data.id === id ? data.symbol : null
        }).filter((num:any): num is number => num !== null)

        return symbol ? symbol[0] : null
    }
    return null
}

const showSuggest = (itemProfile:any) => {
    const suggestItemCode:any = []
    const itemDescription = props.isStandard ? String(itemProfile.item_description).slice(0, 3) : String(itemProfile.item_description.value).slice(0, 3)
    const listObj = {
        thickness: {
            uom: props.isStandard ? getTypeUOM(itemProfile.thickness_uom) : itemProfile.thickness_uom.value,
            value: props.isStandard ? itemProfile.thickness_val : itemProfile.thickness_val.value,
        },
        length: {
            uom: props.isStandard ? getTypeUOM(itemProfile.length_uom) : itemProfile.length_uom.value,
            value: props.isStandard ? itemProfile.length_val : itemProfile.length_val.value,
        },
        width: {
            uom: props.isStandard ? getTypeUOM(itemProfile.width_uom) : itemProfile.width_uom.value,
            value: props.isStandard ? itemProfile.width_val : itemProfile.width_val.value,
        },
        height: {
            uom: props.isStandard ? getTypeUOM(itemProfile.height_uom) : itemProfile.height_uom.value,
            value: props.isStandard ? itemProfile.height_uom : itemProfile.height_uom.value,
        },
        outside: {
            uom: props.isStandard ? getTypeUOM(itemProfile.outside_diameter_uom) : itemProfile.outside_diameter_uom.value,
            value: props.isStandard ? itemProfile.outside_diameter_val : itemProfile.outside_diameter_val.value,
        },
        inside: {
            uom: props.isStandard ? getTypeUOM(itemProfile.inside_diameter_uom) : itemProfile.inside_diameter_uom.value,
            value: props.isStandard ? itemProfile.inside_diameter_val : itemProfile.inside_diameter_val.value,
        },
        volume: {
            uom: props.isStandard ? getTypeUOM(itemProfile.volume_uom) : itemProfile.volume_uom.value,
            value: props.isStandard ? itemProfile.volume_val : itemProfile.volume_val.value,
        },
    }

    if (itemDescription.length >= 3) {
        Object.values(listObj).map((val:any) => {
            if (suggestItemCode.length < 3) {
                if (val.uom !== "" && val.uom !== null && val.uom !== undefined) {
                    if (val.value === "" || val.value === null || val.value === undefined) {
                        val.value = 0
                    }
                    const code = `${itemDescription}${val.value}${val.uom}`
                    suggestItemCode.push(code.toUpperCase().replace(/\s+/g, ""))
                }
            }
            return val
        })
        if (suggestItemCode.length >= 1) {
            return suggestItemCode
        }
    }
}
const selectSuggest = (item:any, itemProfile:any) => {
    itemProfile.item_code = item
}

const doShowSuggest = (character:any, elementId:any) => {
    const selectItem = document.getElementById(elementId + "item") as HTMLElement
    selectItem.classList.remove("hidden")
    selectItem.classList.add("flex")
    itemSuggest.value = showSuggest(character)
}
const hideShowSuggest = () => {
    if (!isFocus.value) {
        const selectItem = document.getElementById(compId + "item") as HTMLElement
        selectItem.classList.remove("flex")
        selectItem.classList.add("hidden")
    }
}
const doSelectKey = (item:any, itemProfile:any) => {
    isFocus.value = true
    selectSuggest(item, itemProfile)
    const selectItem = document.getElementById(compId + "item") as HTMLElement
    selectItem.classList.remove("flex")
    selectItem.classList.add("hidden")
    isFocus.value = false
}
</script>
<template>
    <div tabindex="0" @focusin="doShowSuggest(itemProfile, compId)" @focusout="hideShowSuggest">
        <div class="PsTextInput">
            <div class="flex flex-col">
                <input
                    :id="compId"
                    v-model="model"
                    type="text"
                    class="w-full min-w-[120px] border border-slate-600 rounded-md px-3 text-md flex items-center relative cursor-pointer"
                    :placeholder="placeholder"
                    :required="required"
                >
            </div>
        </div>
        <div :id="compId+'item'" class="hidden absolute">
            <div
                v-if="itemSuggest"
                class="max-h-72 left-0 min-w-full overflow-auto py-2 px-2 border border-slate-800 bg-white rounded flex flex-col gap-2 z-10"
            >
                <span v-for="(item, index) in itemSuggest" :key="index" class="cursor-pointer hover:bg-slate-100 px-3 py-1 border-b" @click="doSelectKey(item, itemProfile)">
                    {{ item }}
                </span>
            </div>
        </div>
    </div>
</template>
