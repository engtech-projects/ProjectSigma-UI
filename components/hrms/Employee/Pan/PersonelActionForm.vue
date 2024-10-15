<script setup>
import { usePersonelActionNotice } from "@/stores/hrms/pan"
import { useApprovalStore } from "@/stores/hrms/setup/approvals"

const approval = useApprovalStore()
const pan = usePersonelActionNotice()
const snackbar = useSnackbar()
const boardLoading = ref(false)
pan.personelActionNotice.type = "New Hire"
const approvals = await approval.getApprovalByName("Personnel Action Notice")
pan.personelActionNotice.approvals = approvals
const savePan = async () => {
    try {
        boardLoading.value = true
        await pan.savePan()
        if (pan.successMessage) {
            snackbar.add({
                type: "success",
                text: pan.successMessage
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
        pan.personelActionNotice.approvals = approvals
    }
}
const setCompanyId = () => {
    pan.generateCompanyIdNum()
}
</script>
<template>
    <LayoutBoards
        title=" "
        class="shadow-md bg-white border-gray-200 rounded-lg w-full"
        :loading="boardLoading"
    >
        <div class="flex items-center md:justify-center p-4">
            <div class="text-2xl p-3 lg:text-4xl text-right">
                <h1 class="font-bold text-sm text-green-500">
                    EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
                </h1>
                <h6 class="font-normal text-xs">
                    P-2, Poblacion 8, Buenavista, Agusan Del Norte
                </h6>
                <h6 class="font-normal text-xs italic">
                    email address:
                    <a
                        href="mailto:evenparcorporation@gmail.com"
                        class="italic text-green-600 dark:text-green-500 hover:underline"
                    >evenparcorporation@gmail.com</a>
                </h6>
            </div>
            <div>
                <img
                    class="w-24 h-16 dark:ring-gray-500 mx-auto block logo"
                    src="/evenpar.jpg"
                    alt="Evenpar Logo"
                >
            </div>
        </div>
        <div class="w-full px-2">
            <div class="flex justify-center border border-slate-300">
                <label
                    for="small-input"
                    class="flex text-lg font-medium text-blue-700 dark:text-white underline p-2"
                >PERSONNEL ACTION NOTICE</label>
            </div>
            <form action="" class="mt-5">
                <table
                    class="w-full border-collapse border border-slate-300 table-fixed"
                >
                    <tbody>
                        <tr>
                            <td colspan="4" class="border border-slate-300 p-2">
                                <div class="md:flex gap-2 space-x-2 p-2">
                                    <input id="newhire" v-model="pan.personelActionNotice.type" class="" type="radio" value="New Hire">
                                    <label
                                        for="newhire"
                                        class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                                    >NEW HIRE</label>
                                    <input id="transfer" v-model="pan.personelActionNotice.type" class="" type="radio" value="Transfer">
                                    <label
                                        for="transfer"
                                        class="text-xs text-gray-900 dark:text-gray-300"
                                    >TRANSFER</label>
                                    <input id="promotion" v-model="pan.personelActionNotice.type" type="radio" value="Promotion">
                                    <label
                                        for="promotion"
                                        class="text-xs text-gray-900 dark:text-gray-300"
                                    >PROMOTION</label>
                                    <input id="termination" v-model="pan.personelActionNotice.type" class="" type="radio" value="Termination">
                                    <label
                                        for="termination"
                                        class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                                    >TERMINATION</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="border border-slate-300 p-2">
                                <div>
                                    <label
                                        for="small-input"
                                        class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                                    >APPLICANT:</label>
                                    <HrmsEmployeePanSearchBar />
                                </div>
                            </td>
                            <td v-if="pan.personelActionNotice.type === 'New Hire'" class="border border-slate-300 p-2">
                                <div>
                                    <label
                                        for="small-input"
                                        class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                                    >
                                        COMPANY ID NUM.:
                                        <span @click="setCompanyId">
                                            generate
                                        </span>
                                    </label>
                                    <input
                                        id="small-input"
                                        v-model="pan.personelActionNotice.company_id_num"
                                        type="text"
                                        class="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                </div>
                            </td>
                            <td class="border border-slate-300 p-2">
                                <div>
                                    <label
                                        for="small-input"
                                        class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                                    >EFFECTIVE DATE:</label>
                                    <input
                                        id="small-input"
                                        v-model="pan.personelActionNotice.date_of_effictivity"
                                        type="date"
                                        class="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                </div>
                            </td>
                        </tr>
                        <template v-if="pan.personelActionNotice.type === 'New Hire'">
                            <HrmsEmployeePanPersonelNewHire />
                        </template>
                        <template v-if="pan.personelActionNotice.type === 'Promotion'">
                            <HrmsEmployeePanPersonelPromotion />
                        </template>
                        <template v-if="pan.personelActionNotice.type === 'Termination'">
                            <HrmsEmployeePanPersonelTermination />
                        </template>
                        <template v-if="pan.personelActionNotice.type === 'Transfer'">
                            <HrmsEmployeePanPersonelTransfer />
                        </template>
                        <tr>
                            <td colspan="4">
                                <label
                                    for="small-input"
                                    class="flex justify-center text-md font-medium text-blue-700 dark:text-white"
                                >COMMENTS/EXPLANATIONS</label>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="border border-slate-300 p-2">
                                <div>
                                    <input
                                        id="small-input"
                                        v-model="pan.personelActionNotice.comments"
                                        type="text"
                                        placeholder="Comments and explanations here"
                                        class="italic block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="border-slate-300 p-2">
                                <HrmsCommonRequestedBy />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <label
                                    for="small-input"
                                    class="flex justify-center text-md font-medium text-blue-700 dark:text-white"
                                >
                                    APPROVAL
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <HrmsEmployeePanPersonelApproval class="w-full" />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <div class="flex justify-between p-2">
                                    <label
                                        for="small-input"
                                        class="flex justify-left px-2 text-lg font-medium text-gray-700 dark:text-white"
                                    />
                                    <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click.prevent="savePan()">
                                        Submit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    </LayoutBoards>
</template>
