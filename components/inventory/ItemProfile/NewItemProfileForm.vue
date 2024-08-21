<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"
import { useApprovalStore, APPROVAL_TRAVELORDER } from "@/stores/hrms/setup/approvals"

const approvals = useApprovalStore()
const mains = useItemProfileStore()

const { itemProfile, subitemgroup, uom, itemgroup, errorMessage, successMessage } = storeToRefs(mains)

itemProfile.value.approvals = await approvals.getApprovalByName(APPROVAL_TRAVELORDER)
await mains.getItemGroups()
await mains.getUOM()
const snackbar = useSnackbar()
const boardLoading = ref(false)

const getSubItemGroup = async (event: any) => {
    await mains.getSubItemGroups(event.target.value)
}

const submitForm = async () => {
    try {
        boardLoading.value = true
        await mains.createRequest()
        if (mains.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: mains.errorMessage
            })
            mains.$reset()
            itemProfile.value.approvals = await approvals.getApprovalByName(APPROVAL_TRAVELORDER)
        } else {
            snackbar.add({
                type: "success",
                text: mains.successMessage
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    } finally {
        mains.clearMessages()
        boardLoading.value = false
        itemProfile.value.approvals = formApproval
    }
}
</script>

<template>
    <LayoutBoards title="New Item Profile" class="w-full" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="submitForm">
                <div class="grid grid-cols-1 gap-2 mt-2">
                    <div class="flex-1 flex-col gap-4 p-2 mb-2">
                        <LayoutFormPsTextInput v-model="itemProfile.sku" title="SKU" />
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-2">
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsNumberInput v-model="itemProfile.thickness" title="Thickness" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsNumberInput v-model="itemProfile.length" title="Length" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsNumberInput v-model="itemProfile.width" title="Width" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsNumberInput v-model="itemProfile.height" title="Height" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsNumberInput v-model="itemProfile.outisde_diameter" title="Outside Diameter" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsNumberInput v-model="itemProfile.inside_diameter" title="Inside Diameter" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="itemProfile.specification" title="Specification" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="itemProfile.grade" title="Grade" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="itemProfile.color" title="Color" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <label
                                for="item_group"
                                class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Item Group
                            </label>
                            <select
                                id="item_group"
                                v-model="itemProfile.item_group"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required
                                @change="getSubItemGroup($event)"
                            >
                                <option v-for="item in itemgroup" :key="item.id" :value="item.id">
                                    {{ item.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <label
                                for="item_group"
                                class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Sub Item group
                            </label>
                            <select
                                id="item_group"
                                v-model="itemProfile.subitem_group"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required
                            >
                                <option v-for="item in subitemgroup" :key="item.id" :value="item.id">
                                    {{ item }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="itemProfile.item_type" title="Item Type" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <label
                                for="item_group"
                                class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Unit of Measurements
                            </label>
                            <select
                                id="item_group"
                                v-model="itemProfile.uom"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required
                            >
                                <option v-for="item in uom" :key="item.id" :value="item.id">
                                    {{ item.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <LayoutFormPsTextInput v-model="itemProfile.convertions" title="Convertions" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div class="mb-2">
                            <label
                                for="status"
                                class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Status
                            </label>
                            <select
                                id="status"
                                v-model="itemProfile.status"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required
                            >
                                <option value="active">
                                    Active
                                </option>
                                <option value="inactive">
                                    Inactive
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="w-full rounded-lg p-4 bg-slate-100 ">
                    <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Recommending Approval:</label>
                    <HrmsSetupApprovalsList
                        v-for="(approv, apr) in itemProfile.approvals"
                        :key="'hrmsetupapprovallist'+apr"
                        v-model="itemProfile.approvals[apr]"
                    />
                </div>
                <div class="flex justify-end">
                    <button type="submit" class="flex-1 text-white p-2 rounded-lg bg-teal-600 content-center mt-5">
                        Submit Form
                    </button>
                </div>
            </form>
            <p
                hidden
                class=" text-red-600 text-center font-semibold mt-2 italic"
                :class="{ 'fade-out': !errorMessage }"
            >
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class=" text-green-600 text-center font-semibold italic transition-opacity delay-1000"
            >
                {{ successMessage }}
            </p>
        </div>
    </LayoutBoards>
</template>

<style scoped>
.error-message,
.success-message {
    transition: opacity 1s ease;
}

.error-message.fade-out,
.success-message.fade-out {
    animation-duration: 1s;
    opacity: 0;
}
</style>
