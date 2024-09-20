<script lang="ts" setup>
const compId = useId()
const model = defineModel({ required: true, type: String, default: null })
const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    selectList: {
        type: Object,
        default: null,
    },
})
const emit = defineEmits(["itemGroupChange"])
function selectOption (option: any) {
    model.value = option
}
const testfunct = (event: Event) => {
    const id = event?.target.value ? event?.target.value : null
    emit("itemGroupChange", id)
}
</script>
<template>
    <div v-if="props.selectList.length" class="PsSelectInput">
        <select
            :id="compId"
            v-model="model"
            class="w-[120px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block"
            @change="testfunct"
        >
            <option
                v-for="option, i in props.selectList"
                :key="i"
                :value="option.id"
                @click="selectOption(option.id)"
            >
                {{ option.name }}
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
