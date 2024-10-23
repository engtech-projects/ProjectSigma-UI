<script lang="ts" setup>
const props = defineProps({
    options: {
        type: Array,
        default: () => { return [] }
    },
    title: {
        type: String,
        default: ""
    },
    opid: {
        type: String,
        default: ""
    },
    selectedId: {
        type: Number,
        default: null
    },
    height: {
        type: String,
        default: "h-40"
    },
    fz: {
        type: String,
        default: "text-md"
    }
})
const searchInput = ref("")
const emit = defineEmits(["select"])
const selectedOption = ref(null)
const showDD = ref(false)
function toggleDD () {
    showDD.value = !showDD.value
}
function selectOption (option:any) {
    emit("select", option)
    selectedOption.value = option
    toggleDD()
    searchInput.value = ""
}
const currentOptionValue = computed(() => {
    let option = null
    if (props.selectedId) {
        props.options.forEach((item:any) => {
            if (item[props.opid] === props.selectedId) {
                option = item
            }
        })
    } else {
        option = selectedOption
    }
    return option
})
const searchedOptions = computed(() => {
    const op:Array<any> = []
    if (searchInput.value === "" && searchInput.value.length < 3) {
        return props.options
    } else {
        props.options.forEach((item:any) => {
            if (item[props.title].toLowerCase().includes(searchInput.value.toLocaleLowerCase())) {
                op.push(item)
            }
        })
    }
    return op
})
</script>
<template>
    <div class="border border-gray-300 rounded-md px-3 text-md flex items-center relative cursor-pointer">
        <div class="flex flex-1 items-center" :class="props.height + ' ' + props.fz" @click="toggleDD">
            <div class="flex-1 h-[25px] overflow-hidden">
                <span class="flex-1">{{ currentOptionValue?currentOptionValue[title]:'' }}</span>
            </div>
            <Icon name="iconoir:nav-arrow-down" class="font-bold text-xl" />
        </div>
        <div v-if="showDD" class="absolute max-h-72 left-0 top-11 min-w-full py-2 px-2 border border-slate-800 bg-white rounded flex flex-col gap-2">
            <div class="px-3 w-full">
                <input v-model="searchInput" type="text" class="border border-slate-300 rounded w-full h-10" placeholder="Search">
            </div>
            <div v-if="!searchedOptions.length" class="px-4">
                <span>No data available.</span>
            </div>
            <div class="flex flex-col overflow-auto">
                <span v-for="option,i in searchedOptions" :key="i" class="cursor-pointer hover:bg-slate-100 px-3 py-1 border-b" @click="selectOption(option)">{{ option[props.title] }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .h-40 {
        height: 40px!important
    }
    .h-30 {
        height: 35px!important
    }
</style>
