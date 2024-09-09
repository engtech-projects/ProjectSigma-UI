<script lang="ts" setup>
import { useStakeholderGroupStore } from "~/stores/accounting/stakeholdergroup"
import { useStakeHolderTypeStore } from "~/stores/accounting/stakeholdertype"

const stakeHolderTypeStore = useStakeHolderTypeStore()
await stakeHolderTypeStore.getStakeHolderTypes()
const stakeholderGroupStore = useStakeholderGroupStore()
const snackbar = useSnackbar()
const isLoading = ref(false)

async function handleSubmit () {
    try {
        isLoading.value = true
        stakeholderGroupStore.stakeholderGroup.stakeholder_type_ids = JSON.stringify(checkedStakeholderTypes.value)
        await stakeholderGroupStore.createStakeholderGroup()
        if (stakeholderGroupStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: stakeholderGroupStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: stakeholderGroupStore.successMessage
            })
        }
    } catch (error) {
        stakeholderGroupStore.errorMessage = error
        snackbar.add({
            type: "error",
            text: stakeholderGroupStore.errorMessage
        })
    } finally {
        isLoading.value = false
        navigateTo("/accounting/stakeholder-group")
    }
}

const stakeholderTypes = computed(() => {
    const arr = JSON.parse(JSON.stringify(stakeHolderTypeStore.list))
    arr.forEach((item) => {
        item.checked = false
    })
    return arr
})

const checkedStakeholderTypes = computed(() => {
    const ids = []
    stakeholderTypes.value.forEach((st) => {
        if (st.checked) {
            ids.push(st.stakeholder_type_id)
        }
    })
    return ids
})

</script>
<template>
    <LayoutBoards title="Create New Stakeholder Group" :loading="isLoading" class="w-full">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="stakeholder_group_name"
                        class="text-xs italic"
                    >Stakeholder Group Name</label>
                    <input
                        id="stakeholderGroupName"
                        v-model="stakeholderGroupStore.stakeholderGroup.stakeholder_group_name"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div>
                    <label
                        for="account_type"
                        class="text-xs italic"
                    >Stakeholder Type</label>
                    <div>
                        <div class="flex flex-col ml-4">
                            <div v-for="st in stakeholderTypes" :key="st.stakeholder_type_id" class="flex flex-col gap-2">
                                <div class="flex gap-4 items-center py-1 border-b">
                                    <input id="" v-model="st.checked" type="checkbox" name="">
                                    <span>{{ st.stakeholder_type_name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <NuxtLink
                    to="/accounting/stakeholder-group"
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5 text-center"
                >
                    Cancel
                </NuxtLink>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Stakeholder Group
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
