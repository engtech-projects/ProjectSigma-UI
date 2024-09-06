<script lang="ts" setup>
import { useStakeHolderTypeStore } from "~/stores/accounting/stakeholdertype"
import { useModalStore } from "~/stores/modal"

const stakeHolderTypeStore = useStakeHolderTypeStore()
const snackbar = useSnackbar()
const isLoading = ref(false)
const modalStore = useModalStore()
const props = defineProps({
    isModal: {
        type: Boolean,
        default: false
    },
})
async function handleSubmit () {
    try {
        isLoading.value = true
        await stakeHolderTypeStore.createStakeHolderType()
        if (stakeHolderTypeStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: stakeHolderTypeStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: stakeHolderTypeStore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: stakeHolderTypeStore.errorMessage
        })
    } finally {
        isLoading.value = false
        stakeHolderTypeStore.reset()
        modalStore.hideModal()
    }
}
</script>
<template>
    <LayoutBoards title="Create StakeholderType" :loading="isLoading" class="w-full">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="book_name"
                        class="text-xs italic"
                    >Stakeholder Type Name</label>
                    <input
                        id="bookName"
                        v-model="stakeHolderTypeStore.stakeHolderType.stakeholder_type_name"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <NuxtLink
                    v-if="!props.isModal"
                    to="/accounting/stakeholder-type"
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5 text-center"
                >
                    Cancel
                </NuxtLink>
                <button v-else class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5 text-center" @click="modalStore.hideModal">
                    Cancel
                </button>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Stakeholder
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
