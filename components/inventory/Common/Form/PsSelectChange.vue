<script lang="ts" setup>
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
const model = defineModel({ type: String, required: true })
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
            v-model="model"
            :class="addClass"
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
            :class="addClass"
        >
            <option>
                No Data
            </option>
        </select>
    </div>
</template>
