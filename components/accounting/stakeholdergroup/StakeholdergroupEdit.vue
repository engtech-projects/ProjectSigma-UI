<script lang="ts" setup>
import { useStakeholderGroupStore } from "~/stores/accounting/stakeholdergroup"
import { useStakeHolderTypeStore } from "~/stores/accounting/stakeholdertype"

const stakeHolderTypeStore = useStakeHolderTypeStore()
stakeHolderTypeStore.getStakeHolderTypes()
const stakeholderGroupStore = useStakeholderGroupStore()
const snackbar = useSnackbar()
const isLoading = ref(false)

async function handleSubmit () {
    try {
        isLoading.value = true
        await stakeholderGroupStore.editStakeholderGroup()
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
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: stakeholderGroupStore.errorMessage
        })
    } finally {
        isLoading.value = false
        navigateTo("/accounting/stakeholder-group")
    }
}
const select = (st:any) => {
    stakeholderGroupStore.stakeholderGroup.stakeholder_type_id = st.stakeholder_type_id
}
onMounted(() => {
    console.log(stakeholderGroupStore.stakeholderGroup.stakeholder_type_id)
})
</script>

<template>
    <LayoutBoards title="Edit Stakeholder Group" :loading="isLoading" class="w-full">
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
                    <AccountingSelectSearch
                        :options="stakeHolderTypeStore.list"
                        title="stakeholder_type_name"
                        opid="stakeholder_type_id"
                        :selected-id="stakeholderGroupStore.stakeholderGroup.stakeholder_type_id"
                        @select="select"
                    />
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
                    Update Stakeholder Group
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
