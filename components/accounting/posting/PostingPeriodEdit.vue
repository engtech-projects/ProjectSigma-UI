<script lang="ts" setup>
import { usePostingPeriodStore } from "~/stores/accounting/postingperiod"

const postingPeriodStore = usePostingPeriodStore()
const snackbar = useSnackbar()
const isLoading = ref(false)

async function handleSubmit () {
    try {
        isLoading.value = true
        await postingPeriodStore.editPostingPeriod()
        snackbar.add({
            type: "success",
            text: postingPeriodStore.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: postingPeriodStore.errorMessage || "something went wrong."
        })
    } finally {
        isLoading.value = false
    }
}

function cancelEdit () {
    postingPeriodStore.isEdit = false
    postingPeriodStore.reset()
    return navigateTo("/accounting/posting-period")
}
</script>

<template>
    <LayoutBoards title="Edit Posting Period" :loading="isLoading" class="w-full">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="period_start"
                        class="text-xs italic"
                    >Period Start</label>
                    <input
                        id="periodStart"
                        v-model="postingPeriodStore.postingPeriod.period_start"
                        type="date"
                        class="w-full rounded-lg"
                        required
                    >
                </div>

                <div>
                    <label
                        for="period_end"
                        class="text-xs italic"
                    >Period End</label>
                    <input
                        id="periodEnd"
                        v-model="postingPeriodStore.postingPeriod.period_end"
                        type="date"
                        class="w-full rounded-lg"
                        required
                    >
                </div>

                <div>
                    <label
                        for="status"
                        class="text-xs italic"
                    >Status</label>
                    <select
                        id="typeName"
                        v-model="postingPeriodStore.postingPeriod.status"
                        class="w-full rounded-lg"
                        required
                    >
                        <option value="open">
                            Open
                        </option>
                        <option value="closed">
                            Closed
                        </option>
                    </select>
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <button
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5"
                    @click.prevent="cancelEdit"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Update Period
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
