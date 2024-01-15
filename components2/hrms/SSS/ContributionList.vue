<script setup>
import { storeToRefs } from "pinia"
import { useContributionStore } from "@/stores/sss"

const contributions = useContributionStore()
contributions.getContribution()

const { list: contributionList, isEdit, contribution, getParams, pagination } = storeToRefs(contributions)

const setEdit = (cont) => {
    isEdit.value = true
    contribution.value = cont
}
const deleteCont = (cont) => {
    contributions.deleteContribution(cont.id)
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    // getParams.value.syId = newParams.id ?? ""
    // getParams.value.semId = newParams.semId ?? ""
    // getParams.value.feeType = newParams.feeType ?? ""
    // getParams.value.particularName = newParams.particularName ?? ""
}

</script>

<template>
    <LayoutBoards title="Contribution Table" class="w-full p-4">
        <div class="pb-2 text-gray-500">
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th hidden class="border p-2">
                            #
                        </th>
                        <th class="p-2">
                            Range From
                        </th>
                        <th class="p-2">
                            Range To
                        </th>
                        <th class="p-2">
                            Employer Share
                        </th>
                        <th class="p-2">
                            Employee Share
                        </th>
                        <th hidden class="p-2">
                            Total Contributions
                        </th>
                        <th class="p-2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(contrib, index) in contributionList" :key="index" class="border">
                        <td hidden class="border p-2">
                            {{ index + 1 }}
                        </td>
                        <td class="p-2">
                            <span>{{ contrib.range_from }}</span>
                        </td>
                        <td class="p-2">
                            <span>{{ contrib.range_to }}</span>
                        </td>
                        <td class="p-2">
                            <span>{{ contrib.employee_share }}</span>
                        </td>
                        <td class="p-2">
                            <span>{{ contrib.employer_share }}</span>
                        </td>
                        <td hidden class="p-2">
                            <span>{{ contrib.totalContributions }}</span>
                        </td>
                        <td class=" p-2 flex gap-2 justify-center">
                            <button @click="setEdit(contrib)">
                                <Icon name="material-symbols:edit" color="white" class="bg-green-400 rounded h-8 w-8 p-1" />
                            </button>
                            <button

                                @click="deleteCont(contrib)"
                            >
                                <Icon name="ion:trash" color="white" class="bg-red-500 rounded h-8 w-8 p-1" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
    </LayoutBoards>
</template>
