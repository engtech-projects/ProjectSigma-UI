<script lang="ts" setup>
import { usePostingPeriodStore } from "@/stores/accounting/setup/postingperiod"
const postingPeriodStore = usePostingPeriodStore()
const props = defineProps({
    data: {
        type: Object,
        default: null
    }
})
const emit = defineEmits(["addPeriod"])
const collapse = ref(false)

const addPeriod = () => {
    collapse.value = false
    postingPeriodStore.postingPeriod.posting_period_id = props.data.id
    emit("addPeriod")
}
onMounted(() => {
    collapse.value = props.data.status.toLowerCase() === "open"
})
</script>

<template>
    <div class="flex flex-col">
        <div class="grid grid-cols-12 bg-slate-100 px-4 py-2 items-center cursor-pointer hover:bg-slate-200" @click="collapse = !collapse">
            <span class="col-span-7 text-xs font-bold">
                {{ fullDate(data.period_start) + " - " + fullDate(data.period_end) }}
            </span>
            <span class="col-span-1 text-xs font-bold" :class="data.status.toLowerCase()==='closed' ? 'text-red-500' : 'text-green-500'">
                {{ data.status.toUpperCase() }}
            </span>
            <div class="text-right col-span-4 h-fit">
                <button v-if="data.status.toLowerCase()==='open'" class="text-xs bg-green-500 px-3 py-[2px] hover:bg-green-600 active:bg-green-500 rounded-lg text-white mr-4" @click.prevent="addPeriod">
                    + Add Period
                </button>
                <button>
                    <Icon v-show="collapse" name="iconamoon:arrow-down-2-duotone" class="text-2xl text-slate-700" />
                    <Icon v-show="!collapse" name="iconamoon:arrow-right-2-duotone" class="text-2xl cursor-pointer text-slate-700" />
                </button>
            </div>
        </div>
        <table v-if="collapse" class="table-auto w-full border-collapse text-xs">
            <thead>
                <tr class="text-left">
                    <th class="p-2">
                        Start Date
                    </th>
                    <th class="p-2">
                        End Date
                    </th>
                    <th class="p-2">
                        Date Created
                    </th>
                    <th class="p-2">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pp in data.periods" :key="pp.id" class="border text-left">
                    <td class="p-2">
                        {{ fullDate(pp.start_date) }}
                    </td>
                    <td class="p-2">
                        {{ fullDate(pp.end_date) }}
                    </td>
                    <td class="p-2">
                        {{ fullDate(pp.created_at) }}
                    </td>
                    <td class="p-2" :class="pp.status.toLowerCase()==='closed' ? 'text-red-500' : 'text-green-500'">
                        {{ upperFirst(pp.status) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>

</style>
