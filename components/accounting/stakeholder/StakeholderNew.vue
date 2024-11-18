<script setup>
import { useStakeHolderStore } from "~/stores/accounting/stakeholders/stakeholder"
import { useStakeHolderTypesStore } from "~/stores/accounting/stakeholders/stakeholdertype"
import { useModalStore } from "~/stores/modal"

const stakeholderStore = useStakeHolderStore()
const snackbar = useSnackbar()
const isLoading = ref(false)
const modalStore = useModalStore()
modalStore.title = "Create New Stakeholder Type"

const stakeHolderTypeStore = useStakeHolderTypesStore()
stakeHolderTypeStore.getStakeHolderTypes()

function select (val) {
    stakeholderStore.stakeholder.stakeholder_type_id = val.stakeholder_type_id
}

async function handleSubmit () {
    try {
        isLoading.value = true
        await stakeholderStore.createStakeholder()
        if (stakeholderStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: stakeholderStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: stakeholderStore.successMessage
            })
            stakeholderStore.reset()
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: stakeholderStore.errorMessage
        })
    } finally {
        isLoading.value = false
        navigateTo("/accounting/stakeholder")
        // stakeholderStore.reset()
    }
}
</script>
<template>
    <LayoutBoards title="Create New Stakeholder" :loading="isLoading" class="w-full">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
                <div class="flex gap-4">
                    <div class="flex-1">
                        <label
                            for="title"
                            class="text-xs italic"
                        >Title</label>
                        <input
                            id="title"
                            v-model="stakeholderStore.stakeholder.title"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="display_name"
                            class="text-xs italic"
                        >Display Name</label>
                        <input
                            id="displayName"
                            v-model="stakeholderStore.stakeholder.display_name"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                </div>

                <div class="flex gap-4">
                    <div class="flex-2">
                        <label
                            for="firstname"
                            class="text-xs italic"
                        >Firstname</label>
                        <input
                            id="firstname"
                            v-model="stakeholderStore.stakeholder.firstname"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div class="flex-2">
                        <label
                            for="middlename"
                            class="text-xs italic"
                        >Middlename</label>
                        <input
                            id="middlename"
                            v-model="stakeholderStore.stakeholder.middlename"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div class="flex-2">
                        <label
                            for="lastname"
                            class="text-xs italic"
                        >Lastname</label>
                        <input
                            id="lastname"
                            v-model="stakeholderStore.stakeholder.lastname"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div class="flex-2">
                        <label
                            for="suffix"
                            class="text-xs italic"
                        >Suffix</label>
                        <input
                            id="suffix"
                            v-model="stakeholderStore.stakeholder.suffix"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>

                <div class="flex gap-4">
                    <div class="flex-1">
                        <label
                            for="email"
                            class="text-xs italic"
                        >Email</label>
                        <input
                            id="email"
                            v-model="stakeholderStore.stakeholder.email"
                            type="email"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="mobile_number"
                            class="text-xs italic"
                        >Mobile Number</label>
                        <input
                            id="mobileNumber"
                            v-model="stakeholderStore.stakeholder.mobile_number"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="telephone_number"
                            class="text-xs italic"
                        >Telephone Number</label>
                        <input
                            id="telephoneNumber"
                            v-model="stakeholderStore.stakeholder.phone_number"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>

                <div class="flex gap-4">
                    <div class="flex-1">
                        <label
                            for="company_name"
                            class="text-xs italic"
                        >Company</label>
                        <input
                            id="company"
                            v-model="stakeholderStore.stakeholder.company"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div class="flex-1 flex gap-2 items-end">
                        <div class="flex-1">
                            <label
                                for="stakeholder_type"
                                class="text-xs italic"
                            >Stakeholder Type</label>
                            <AccountingSelectSearch
                                :options="stakeHolderTypeStore.list"
                                title="stakeholder_type_name"
                                opid="stakeholder_type_id"
                                :selected-id="stakeholderStore.stakeholder.stakeholder_type_id"
                                @select="select"
                            />
                        </div>
                        <button class="px-3 rounded h-10 bg-green-500 text-white hover:bg-green-600 active:bg-green-500" @click.prevent="modalStore.showModal">
                            + New
                        </button>
                    </div>
                </div>

                <div class="flex gap-4">
                    <div class="flex-2">
                        <label
                            for="street"
                            class="text-xs italic"
                        >Street</label>
                        <input
                            id="street"
                            v-model="stakeholderStore.stakeholder.street"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="city"
                            class="text-xs italic"
                        >City</label>
                        <input
                            id="city"
                            v-model="stakeholderStore.stakeholder.city"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>

                <div class="flex gap-4">
                    <div class="flex-1">
                        <label
                            for="state"
                            class="text-xs italic"
                        >State</label>
                        <input
                            id="state"
                            v-model="stakeholderStore.stakeholder.state"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="country"
                            class="text-xs italic"
                        >Country</label>
                        <input
                            id="country"
                            v-model="stakeholderStore.stakeholder.country"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <NuxtLink
                    to="/accounting/stakeholder"
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5 text-center"
                >
                    Cancel
                </NuxtLink>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Stakeholder
                </button>
            </div>
        </form>
    </LayoutBoards>
    <ModalContainer>
        <AccountingStakeholderTypeNew is-modal="true" />
    </ModalContainer>
</template>

<style scoped></style>
