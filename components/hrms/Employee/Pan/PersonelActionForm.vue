<script setup>
import { usePersonelActionNotice } from "@/stores/hrms/pan"
const pan = usePersonelActionNotice()
pan.personelActionNotice.type = "newhire"
pan.personelActionNotice.salary_type = "Fixed Rate"
pan.personelActionNotice.hire_source = "Internal"
</script>
<template>
    <div
        class="shadow-md p-4 mt-6 bg-white mb-3 border border-gray-200 rounded-lg w-full md:w-1/2"
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
        <div class="w-full">
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
                                {{ pan.personelActionNotice.type }}
                                <div class="md:flex gap-2 space-x-2 p-2">
                                    <input id="newhire" v-model="pan.personelActionNotice.type" class="" type="radio" value="newhire">
                                    <label
                                        for="newhire"
                                        class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                                    >NEW HIRE</label>
                                    <input id="termination" v-model="pan.personelActionNotice.type" class="" type="radio" value="termination">
                                    <label
                                        for="termination"
                                        class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                                    >TERMINATION</label>
                                    <input id="transfer" v-model="pan.personelActionNotice.type" class="" type="radio" value="transfer">
                                    <label
                                        for="transfer"
                                        class="text-xs text-gray-900 dark:text-gray-300"
                                    >TRANSFER</label>
                                    <input id="promotion" v-model="pan.personelActionNotice.type" type="radio" value="promotion">
                                    <label
                                        for="promotion"
                                        class="text-xs text-gray-900 dark:text-gray-300"
                                    >PROMOTION</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="border border-slate-300 p-2">
                                <div>
                                    <label
                                        for="small-input"
                                        class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                                    >EMPLOYEE:</label>
                                    <input
                                        id="small-input"
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
                                    >EMPLOYEE NO.:</label>
                                    <input
                                        id="small-input"
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
                                        type="date"
                                        class="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                </div>
                            </td>
                        </tr>
                        <template v-if="pan.personelActionNotice.type === 'newhire'">
                            <HrmsEmployeePanPersonelNewHire />
                        </template>
                        <template v-if="pan.personelActionNotice.type === 'promotion'">
                            <HrmsEmployeePanPersonelPromotion />
                        </template>
                        <template v-if="pan.personelActionNotice.type === 'termination'">
                            <HrmsEmployeePanPersonelTermination />
                        </template>
                        <template v-if="pan.personelActionNotice.type === 'transfer'">
                            <HrmsEmployeePanPersonelTransfer />
                        </template>

                        <tr>
                            <td colspan="2" class="border border-slate-300 p-2">
                                <div>
                                    <label
                                        for="small-input"
                                        class="inline mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                                    >Eligible for Rehire:</label>

                                    <div class="space-x-2">
                                        <input id="yes" type="checkbox" value="">
                                        <label
                                            for="yes"
                                            class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                                        >Yes</label>
                                        <input id="no" type="checkbox" value="">
                                        <label
                                            for="no"
                                            class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                                        >No</label>
                                    </div>
                                </div>
                            </td>
                            <td colspan="2" class="border border-slate-300 p-2">
                                <div>
                                    <label
                                        for="small-input"
                                        class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                                    >Last Day Worked:</label>
                                    <input
                                        id="small-input"
                                        type="text"
                                        class="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                </div>
                            </td>
                        </tr>

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
                                        type="text"
                                        placeholder="Comments and explanations here"
                                        class="italic block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="4">
                                <label
                                    for="small-input"
                                    class="flex justify-center text-md font-medium text-blue-700 dark:text-white"
                                >APPROVAL</label>
                            </td>
                        </tr>

                        <tr>
                            <td class="border border-slate-300 p-2">
                                <div>
                                    <label
                                        for="small-input"
                                        class="flex justify-center text-xs font-bold text-gray-900 dark:text-white"
                                    />
                                </div>
                            </td>
                            <td class="border border-slate-300 p-2">
                                <div>
                                    <label
                                        for="small-input"
                                        class="flex justify-center text-xs font-bold text-gray-900 dark:text-white"
                                    >DATE</label>
                                </div>
                            </td>
                            <td class="border border-slate-300 p-2">
                                <div>
                                    <label
                                        for="small-input"
                                        class="flex justify-center text-xs font-bold text-gray-900 dark:text-white"
                                    />
                                </div>
                            </td>
                            <td class="border border-slate-300 p-2">
                                <div>
                                    <label
                                        for="small-input"
                                        class="w-12 flex justify-center text-xs font-bold text-gray-900 dark:text-white"
                                    >DATE</label>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td class="border border-slate-300 p-2">
                                <div>
                                    <label
                                        for=""
                                        class="flex text-xs font-medium text-gray-900 dark:text-white"
                                    >Immediate Head:</label>
                                    <input
                                        id="small-input"
                                        type="text"
                                        class="italic block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                </div>
                            </td>
                            <td class="border border-slate-300 p-2 w-6">
                                <div>
                                    <input type="date" class="w-20 md:w-full">
                                </div>
                            </td>
                            <td class="border border-slate-300 p-2">
                                <div class="flex h-16">
                                    <label
                                        for=""
                                        class="inline-block align-text-bottom text-xs pt-4 font-medium text-gray-900 dark:text-white"
                                    >Director: <b>ENGR. RICHIE C. DALAUTA</b></label>
                                </div>
                            </td>
                            <td class="border border-slate-300 p-2">
                                <div>
                                    <input type="date" class="w-20 md:w-full">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-slate-300 p-2">
                                <div>
                                    <label
                                        for=""
                                        class="inline-block align-text-bottom mt-8 text-xs font-medium text-gray-900 dark:text-white"
                                    >HR Head: <b>JERMILY C. MOZO</b></label>
                                </div>
                            </td>
                            <td class="border border-slate-300 p-2">
                                <div>
                                    <input type="date" class="w-20 md:w-full">
                                </div>
                            </td>
                            <td class="border border-slate-300 p-2">
                                <div class="">
                                    <label
                                        for=""
                                        class="inline-block align-text-bottom mt-8 text-xs font-medium text-gray-900 dark:text-white"
                                    >Director: <b>ENGR. DIONISION JONAS A. RODES</b></label>
                                </div>
                            </td>
                            <td class="border border-slate-300 p-2">
                                <div>
                                    <input type="date" class="w-20 md:w-full">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-slate-300 p-2">
                                <div>
                                    <label
                                        for=""
                                        class="flex text-xs font-medium text-gray-900 dark:text-white"
                                    >Director:</label>
                                    <input
                                        id="small-input"
                                        type="text"
                                        class="italic block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                </div>
                            </td>
                            <td class="border border-slate-300 p-2">
                                <div>
                                    <input type="date" class="w-20 md:w-full">
                                </div>
                            </td>
                            <td class="border border-slate-300 p-2">
                                <div class="">
                                    <label
                                        for=""
                                        class="inline-block align-text-bottom mt-8 text-xs font-medium text-gray-900 dark:text-white"
                                    >President: <b>ENGR. ANGEL A. ABRAU</b></label>
                                </div>
                            </td>
                            <td class="border border-slate-300 p-2">
                                <div>
                                    <input type="date" class="w-20 md:w-full">
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="4">
                                <label
                                    for="small-input"
                                    class="flex justify-center text-md font-medium text-blue-700 dark:text-white"
                                >EMPLOYEE SIGNATURE</label>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="border border-slate-300 p-2">
                                <div>
                                    <input
                                        id="small-input"
                                        type="text"
                                        class="italic block w-full p-2 text-gray-900 border-0 border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                </div>
                                <label
                                    for="small-input"
                                    class="flex justify-center text-xs italic font-medium text-gray-900 dark:text-white"
                                >Name & Signature
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    </div>
</template>
