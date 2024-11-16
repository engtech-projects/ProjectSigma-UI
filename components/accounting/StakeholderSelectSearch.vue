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
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
const loading = ref(false)
const stakeholders = ref([])
const filter = ref({
    key: "",
    type: "employee"
})
const emit = defineEmits(["select"])
const selectedOption = ref(null)
const showDD = ref(false)
function toggleDD () {
    if (!props.disabled) {
        showDD.value = !showDD.value
    }
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
    return stakeholders.value
})
const searchInput = computed(() => {
    return filter.value.key
})
const search = async () => {
    loading.value = true
    await useHRMSApi(
        "https://projectsigma-accountingapi-staging.engtechglobalsolutions.com/api/search-stakeholders",
        {
            method: "GET",
            params: filter.value,
            onResponse: (response: any) => {
                stakeholders.value = response.response._data.data.data
            },
        }
    )
    loading.value = false
}
search()
</script>
<template>
    <div class="border border-gray-300 rounded-md px-3 text-md flex items-center relative cursor-pointer">
        <AccountingLoadScreen :is-loading="loading" />
        <div class="flex flex-1 items-center" :class="props.height + ' ' + props.fz" @click="toggleDD">
            <div class="flex-1 h-[25px] overflow-hidden">
                <span class="flex-1">{{ currentOptionValue ? currentOptionValue[title] : '' }}</span>
            </div>
            <Icon v-if="!props.disabled" name="iconoir:nav-arrow-down" class="font-bold text-xl" />
        </div>
        <div v-if="showDD" class="absolute max-h-72 left-0 top-12 min-w-full py-2 px-4 border border-slate-800 bg-gray-100 rounded flex flex-col gap-2">
            <Icon
                name="iconoir:xbox-x"
                class="absolute shadow p-[2px] text-gray-500 hover:text-black active:text-gray-500 top-[-10px] right-[-10px] w-8 h-8 rounded-full bg-white text-3xl"
                @click="toggleDD"
            />
            <div class="px-3 my-3 w-full flex border rounded-md bg-white items-center">
                <select v-model="filter.type" class="border-0 h-10 focus:ring-0 active:ring-0 border-r border-gray-200">
                    <option value="employee">
                        Employee
                    </option>
                    <option value="department">
                        Department
                    </option>
                    <option value="project">
                        Project
                    </option>
                    <option value="supplier">
                        Supplier
                    </option>
                </select>
                <input v-model="filter.key" type="text" class="border-0 flex-1 h-10 bg-white-50 focus:ring-0 active:ring-0" placeholder="Search">
                <Icon
                    v-if="searchInput.length > 0"
                    name="iconoir:xmark"
                    class="text-red-500 hover:text-red-600 text-3xl font-bold mr-2"
                    @click="filter.key=''"
                />
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
        height: 33px!important
    }
</style>
