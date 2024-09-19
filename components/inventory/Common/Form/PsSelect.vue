<script lang="ts" setup>
const compId = useId()
const model = defineModel("item", { required: true, type: String, default: null })
const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    selectList: {
        type: Object,
        default: null,
    },
    addClass: {
        type: String,
        default: "",
    },
})
function selectOption (option: any) {
    model.value = option
}
</script>
<template>
    <div v-if="props.selectList.length" class="PsSelectInput">
        <select
            :id="compId"
            v-model="model"
            :class="addClass"
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
            class="bg-gray-80 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block"
        >
            <option>
                No Data
            </option>
        </select>
    </div>
</template>
