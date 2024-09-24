<script lang="ts" setup>
const compId = useId()
const model = defineModel({ required: true, type: String, default: null })
defineProps({
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
    itemSuggest: {
        type: Array,
        required: false,
        default: null,
    },
})
const emit = defineEmits(["showSuggest", "selectSuggest"])
const isFocus = ref(false)
const doShowSuggest = (character:any, elementId:any) => {
    const selectItem = document.getElementById(elementId + "item") as HTMLElement
    selectItem.classList.remove("hidden")
    selectItem.classList.add("flex")
    emit("showSuggest", character)
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
    emit("selectSuggest", item, itemProfile)
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
                class="max-h-72 left-0 min-w-full overflow-auto py-2 px-2 border border-slate-800 bg-white rounded flex flex-col gap-2 z-10"
            >
                <span v-for="(item, index) in itemSuggest" :key="index" class="cursor-pointer hover:bg-slate-100 px-3 py-1 border-b" @click="doSelectKey(item, itemProfile)">
                    {{ item }}
                </span>
            </div>
        </div>
    </div>
</template>
