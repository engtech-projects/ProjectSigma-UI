<script lang="ts" setup>
import { useSubsidiaryStore } from "~/stores/accounting/subsidiary"

const subsidiaryStore = useSubsidiaryStore()
const snackbar = useSnackbar()
const isLoading = ref(false)

async function handleSubmit () {
    try {
        isLoading.value = true
        await subsidiaryStore.editAccount()
        if (subsidiaryStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: subsidiaryStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: subsidiaryStore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: subsidiaryStore.errorMessage
        })
    } finally {
        isLoading.value = false
        navigateTo("/accounting/subsidiary")
    }
}
</script>
<template>
    <LayoutBoards title="Edit Subsidiary Account" :loading="isLoading" class="w-full">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="subsidiary_name"
                        class="text-xs italic"
                    >Subsidiary Account Name</label>
                    <input
                        id="subsidiaryName"
                        v-model="subsidiaryStore.subsidiary.subsidiary_name"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <NuxtLink
                    to="/accounting/subsidiary"
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5 text-center"
                >
                    Cancel
                </NuxtLink>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Update Subsidiary
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
