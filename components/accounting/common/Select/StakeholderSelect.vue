<template>
    <div
        ref="dropdownRef"
        class="relative w-full flex flex-col border border-gray-500 rounded-lg min-h-[2.4rem]"
    >
        <div class="flex px-2 items-center flex-1 cursor-pointer" @click="toggleDropdown">
            <span class="text-md flex-1 cursor-pointer select-none max-h-[2.4rem] overflow-hidden text-ellipsis whitespace-nowrap">{{ currentValue?.name || placeholder }}</span>
            <Icon v-if="!showDD" name="mdi:chevron-down" class="" />
            <Icon v-if="showDD" name="mdi:chevron-up" class="" />
        </div>
        <div v-if="showDD" class="absolute left-0 top-[37px] min-w-[100%] min-h-72 bg-white rounded-md border border-gray-500">
            <div class="flex gap-1 w-full bg-gray-100 p-2 border-b">
                <div class="flex flex-col w-[35%]">
                    <label class="text-[9px] uppercase text-gray-700 mb-1">Dept</label>
                    <select v-model="dept" class="border border-gray-500 rounded-md p-1 text-xs">
                        <option v-for="option in selectOptions" :key="option" :value="option">
                            {{ upperFirst(option) }}
                        </option>
                    </select>
                </div>
                <div class="flex flex-1 items-center gap-1">
                    <div class="flex flex-col pb-2 w-full">
                        <label class="text-[9px] uppercase text-gray-700 mb-1 cursor-pointer select-none">Stakeholder</label>
                        <div class="flex items-center gap-1 border border-gray-500 rounded-md">
                            <input
                                v-if="dept"
                                v-model="searchString"
                                type="text"
                                class="border-none rounded-md p-1 text-xs focus:ring-0 flex-1"
                                :placeholder="placeholder"
                                index="1"
                            >
                            <input
                                v-else
                                disabled
                                type="text"
                                class="border-none rounded-md p-1 text-xs flex-1"
                                placeholder="Search Stakeholder"
                                index="2"
                                @focus="showDD = true"
                            >
                            <Icon name="mdi:close" class="h-5 w-5 font-bold cursor-pointer text-red-500 " :class="{ 'text-red-700': searchString, 'text-white': !searchString }" @click="searchString = ''" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col max-h-[200px] overflow-auto items-center">
                <img
                    v-if="isLoading"
                    src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGJ6eHh2dmZsMHN5ZnI0YTU5MGFocTk4djhxOXBvend4bG1jeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sSgvbe1m3n93G/giphy.gif"
                    alt=""
                    srcset=""
                    class="w-5 h-5"
                >
                <span v-if="results.length === 0 && !isLoading" class="text-xs text-gray-500 p-2">No result found</span>
                <div class="flex flex-col items-start w-full">
                    <span
                        v-for="result in results"
                        :key="result"
                        class="text-xs text-gray-700 py-2 px-2 border-b hover:bg-gray-100 cursor-pointer w-full"
                        :class="{ 'bg-green-200': result.id === currentValue.id }"
                        @click="selectResult(result)"
                    >{{ result.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
const props = defineProps({
    stakeholderId: {
        type: Number,
        required: true
    },
    stakeholder: {
        type: Object,
        required: true
    },
    selectOptions: {
        type: Array,
        required: true
    },
    placeholder: {
        type: String,
        default: "Search Stakeholder"
    },
    defaultDept: {
        type: String,
        default: null
    }
})
const isLoading = ref(false)
const currentValue = ref(null)
const showDD = ref(false)
const emit = defineEmits(["select"])
const dept = ref(null)
const searchString = ref("")
const searchStakeholder = async () => {
    isLoading.value = true
    try {
        const response = await $fetch(config.public.ACCOUNTING_API_URL + "/api/search-stakeholders", {
            method: "GET",
            watch: true,
            params: {
                type: dept.value,
                key: searchString.value,
            },
        })
        isLoading.value = false
        results.value = response.data?.data ?? []
    } catch (err) {
    }
}
const stakeholderType = computed(() => {
    if (props.stakeholder) {
        const parts = props.stakeholder?.stakeholdable_type?.split("\\")
        return parts ? parts[parts.length - 1].toLowerCase() : ""
    }
    return ""
})
const results = ref([])
const debouncedSearchStakeholder = useDebouncedFn(async () => {
    await searchStakeholder()
}, 500)
watch(searchString, (newQuery) => {
    if (!newQuery) {
        results.value = []
        return
    }
    debouncedSearchStakeholder()
})
watch(dept, async (newValue) => {
    if (newValue && searchString.value) {
        await searchStakeholder()
    }
})
const dropdownRef = ref(null)
const toggleDropdown = () => {
    showDD.value = !showDD.value
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        showDD.value = false
        dept.value = stakeholderType.value
    }
}
const selectResult = (result) => {
    currentValue.value = result
    emit("select", result)
    showDD.value = false
}
onMounted(() => {
    if (props.stakeholder) {
        currentValue.value = props.stakeholder
        // searchString.value = props.stakeholder.name
        dept.value = stakeholderType.value
    }
    if (props.defaultDept) {
        dept.value = props.defaultDept
    }
    document.addEventListener("click", handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside)
})
</script>

<style>
</style>
