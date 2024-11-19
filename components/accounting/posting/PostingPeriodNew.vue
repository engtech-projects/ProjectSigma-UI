<script lang="ts" setup>
import { usePostingPeriodStore } from "~/stores/accounting/setup/postingperiod"

const postingPeriodStore = usePostingPeriodStore()
const snackbar = useSnackbar()
const isLoading = ref(false)

async function handleSubmit () {
    try {
        isLoading.value = true
        await postingPeriodStore.createPostingPeriod()
        if (postingPeriodStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: postingPeriodStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: postingPeriodStore.successMessage
            })
            navigateTo("/accounting/posting-period")
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: postingPeriodStore.errorMessage
        })
    } finally {
        isLoading.value = false
        postingPeriodStore.reset()
    }
}
</script>
<template>
    <LayoutBoards title="Create New Posting Period" :loading="isLoading" class="w-full">
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
                <NuxtLink
                    to="/accounting/posting-period"
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5 text-center"
                >
                    Cancel
                </NuxtLink>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Period
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
