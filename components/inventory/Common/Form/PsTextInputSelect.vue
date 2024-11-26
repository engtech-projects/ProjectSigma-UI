<script lang="ts" setup>
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
        required: false,
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

const isFocus = ref(false)
const compId = useId()
const model = defineModel({ required: true, type: String, default: "" })
const itemSuggest = ref([])

const showSuggest = (object:any) => {
    const itemProfile = object
    const suggestItemCode:any = []
    const itemDescription = props.isStandard ? String(itemProfile.item_description).slice(0, 3) : String(itemProfile.item_description.value).slice(0, 3)
    const listObj = {
        thickness: {
            value: props.isStandard ? itemProfile.thickness_val : itemProfile.thickness_val.value,
        },
        length: {
            value: props.isStandard ? itemProfile.length_val : itemProfile.length_val.value,
        },
        width: {
            value: props.isStandard ? itemProfile.width_val : itemProfile.width_val.value,
        },
        height: {
            value: props.isStandard ? itemProfile.height_val : itemProfile.height_val.value,
        },
        outside: {
            value: props.isStandard ? itemProfile.outside_diameter_val : itemProfile.outside_diameter_val.value,
        },
        inside: {
            value: props.isStandard ? itemProfile.inside_diameter_val : itemProfile.inside_diameter_val.value,
        },
        angle: {
            value: props.isStandard ? itemProfile.angle : itemProfile.angle.value,
        },
        size: {
            value: props.isStandard ? itemProfile.size : itemProfile.size.value,
        },
        volume_val: {
            value: props.isStandard ? itemProfile.volume_val : itemProfile.volume_val.value,
        },
        grade: {
            value: props.isStandard ? itemProfile.grade : itemProfile.grade.value,
        },
        volts: {
            value: props.isStandard ? itemProfile.volts : itemProfile.volts.value,
        },
        plates: {
            value: props.isStandard ? itemProfile.plates : itemProfile.plates.value,
        },
        part_number: {
            value: props.isStandard ? itemProfile.part_number : itemProfile.part_number.value,
        },
        color: {
            value: props.isStandard ? itemProfile.color : itemProfile.color.value,
        },
    }
    if (itemDescription.length >= 3) {
        Object.values(listObj).map((val:any) => {
            if (suggestItemCode.length < 3) {
                if (val.value) {
                    const code = `${itemDescription}${val.value}`
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
