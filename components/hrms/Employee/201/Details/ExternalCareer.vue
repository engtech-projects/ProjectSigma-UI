<template>
    <div>
        <label for="company_info" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-6 italic">External Work Experience</label>
        <form v-for="(emprecord, index) in emprecords" :key="index" action="">
            <div class="flex items-center justify-end">
                <button v-if="index > 0" class="delete-button" @click.prevent="deleteEmprecords(index)">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-red-600"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <button v-if="index === emprecords.length - 1" class="add-button" @click="addEmprecords">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-green-600 "
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <button v-if="index === emprecords.length - 1" class="add-button" @click="addEmprecords">
                    <span class="text-green-500 hover:text-green-700">Add Employment</span>
                </button>
            </div>

            <table class="w-full border-collapse border border-slate-400 table-fixed">
                <tbody>
                    <tr>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">COMPANY NAME</label>
                            <input v-model="emprecord.incdates" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </td>
                        <td class="border border-slate-300 p-1 space-y-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">IMMEDIATE SUPERIOR</label>
                            <div class="flex justify-start items-center gap-2">
                                <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">NAME:</label>
                                <input id="superior_name" v-model="emprecord.posdept" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                            <div class="flex justify-start items-center gap-2">
                                <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">CONTACT:</label>
                                <input id="superior_name" v-model="emprecord.posdept" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">EMPLOYMENT DATES</label>
                            <div class="flex-1 justify-center items-center gap-2">
                                <div class="flex justify-start items-center gap-1">
                                    <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">FROM:</label>
                                    <input id="superior_name" v-model="emprecord.posdept" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                                <div class="flex justify-start items-center gap-1">
                                    <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">TO:</label>
                                    <input id="superior_name" v-model="emprecord.posdept" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                            </div>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">SALARY</label>
                            <div class="flex-1 justify-center items-center gap-2">
                                <div class="flex justify-start items-center gap-1">
                                    <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">START:</label>
                                    <input id="superior_name" v-model="emprecord.posdept" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                                <div class="flex justify-start items-center gap-1">
                                    <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">FINAL:</label>
                                    <input id="superior_name" v-model="emprecord.posdept" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">ADDRESS</label>
                            <div class="flex">
                                <input v-model="emprecord.salary" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">TELEPHONE #</label>
                            <div class="flex">
                                <input v-model="emprecord.reason" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">POSITION</label>
                            <div class="flex">
                                <input v-model="emprecord.reason" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">REASON FOR LEAVING</label>
                            <div class="flex">
                                <input v-model="emprecord.reason" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DUTIES & RESPONSIBILITIES</label>
                            <div class="flex">
                                <input v-model="emprecord.reason" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            emprecords: [{ compname: "", imdtsuperior: "", from: "", salarystart: "", compaddr: "", compcont: "", to: "", salaryfinal: "", duties: "" }],
        }
    },
    methods: {
        addEmprecords () {
            this.emprecords.push({ compname: "", imdtsuperior: "", from: "", salarystart: "", compaddr: "", compcont: "", to: "", salaryfinal: "", duties: "" })
        },
        deleteEmprecords (index) {
            this.emprecords.splice(index, 1)
        },
    },
}
</script>
