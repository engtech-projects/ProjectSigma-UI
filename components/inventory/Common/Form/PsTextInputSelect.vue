<script lang="ts" setup>
const compId = useId()
const model = defineModel("item", { required: true, type: String, default: null })
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
    itemCode: {
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
const emit = defineEmits(["inputKey", "selectKey"])
const doInputKey = (itemCode:any) => {
    const itemBox = document.getElementById(compId + "item") as HTMLElement
    itemBox.classList.remove("hidden")
    itemBox.classList.add("flex")
    emit("inputKey", itemCode)
}
const doSelectKey = (item:any, itemCode:any) => {
    emit("selectKey", item, itemCode)
    const itemBox = document.getElementById(compId + "item") as HTMLElement
    itemBox.classList.remove("flex")
    itemBox.classList.add("hidden")
}
</script>
<template>
    <div class="PsTextInput">
        <div class="flex flex-col">
            <input
                :id="compId"
                v-model="model"
                type="text"
                :name="name"
                class="w-full min-w-[120px] border border-slate-600 rounded-md px-3 text-md flex items-center relative cursor-pointer"
                :placeholder="placeholder"
                :required="required"
                @click="doInputKey(itemCode)"
            >
            <div :id="compId+'item'" class="hidden relative">
                <div
                    class="max-h-72 left-0 min-w-full overflow-auto py-2 px-2 border border-slate-800 bg-white rounded flex flex-col gap-2 z-10"
                >
                    <span v-for="(item, index) in itemSuggest" :key="index" class="cursor-pointer hover:bg-slate-100 px-3 py-1 border-b" @click="doSelectKey(item, itemCode)">
                        {{ item }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
