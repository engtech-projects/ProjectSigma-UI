<script lang="ts" setup>
import { useStakeholderStore } from "~/stores/accounting/stakeholder"

const stakeholderStore = useStakeholderStore()
const snackbar = useSnackbar()

async function handleSubmit () {
    try {
        await journalStore.createJournal()
        if (journalStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: journalStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: journalStore.successMessage
            })
            journalStore.reset()
            journalStore.journal.journal_no = generateJournalNo()
            journalStore.journal.journal_date = dateToString(new Date())
        }
    } catch (error) {
    }
}

</script>
<template>
    <form @submit.prevent="handleSubmit">
        <div class="bg-white shadow rounded-lg border border-gray-200 px-2 relative">
            <div v-if="journalStore.isLoading.create" class="absolute z-50 bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
                <img
                    class="flex justify-center w-28 rounded-md"
                    src="/loader.gif"
                    alt="logo"
                >
            </div>
            <div class="flex justify-between items-center h-16 border-b px-4">
                <h2 class="text-xl text-gray-800">
                    Stakeholder
                </h2>
            </div>
            <div class="flex flex-col gap-3 p-4 w-full">
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="journalNo" class="block text-sm font-medium text-gray-900 dark:text-white">Display Name</label>
                        <input id="journalNo" v-model="stakeholderStore.stakeholder.name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                </div>
            </div>
            <div class="flex justify-end w-full gap-2 mb-8">
                <button
                    type="submit"
                    class="text-white p-1 px-6 border-teal-600 bg-teal-600 content-center mt-5 rounded-md w-fit"
                >
                    Create Stakeholder
                </button>
            </div>
        </div>
    </form>
</template>
<style scoped>
.z-30 {
    z-index: 30;
}
.z-29 {
    z-index: 29;
}
.z-28 {
    z-index: 28;
}
.z-27 {
    z-index: 27;
}
.z-26 {
    z-index: 26;
}
.z-30 {
    z-index: 30;
}
.z-25 {
    z-index: 25;
}
.z-24 {
    z-index: 24;
}
.z-23 {
    z-index: 23;
}
.z-22 {
    z-index: 22;
}
.z-21 {
    z-index: 21;
}
.z-20 {
    z-index: 20;
}
.z-19 {
    z-index: 19;
}
.z-18 {
    z-index: 18;
}
.z-17 {
    z-index: 17;
}
.z-16 {
    z-index: 16;
}
.z-15 {
    z-index: 15;
}
.z-14 {
    z-index: 14;
}
.z-13 {
    z-index: 13;
}
</style>
