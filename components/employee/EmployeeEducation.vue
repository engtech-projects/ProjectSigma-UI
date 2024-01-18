<template>
    <form action="">
        <table class="w-full border-collapse border border-slate-400 table-fixed">
            <tbody>
                <tr v-for="(schl, index) in schls" :key="index">
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="flex-1 mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">TYPE OF SCHOOL</label>
                        <select id="schl_type" v-model="schl.type" name="schl_type" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                            <option value="selected" selected>
                                --SELECT--
                            </option>
                            <option value="a">
                                ELEMENTARY
                            </option>
                            <option value="a-">
                                HIGHSCHOOL
                            </option>
                            <option value="b+">
                                VOCATIONAL SCHOOL
                            </option>
                            <option value="b-">
                                COLLEGE
                            </option>
                            <option value="o+">
                                GRADUATE SCHOOL(MASTERS)
                            </option>
                            <option value="o-">
                                GRADUATE SCHOOL(DOCTORATE)
                            </option>
                        </select>
                    </td>

                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NAME OF SCHOOL</label>
                        <div class="flex">
                            <input v-model="schl.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DEGREE EARNED</label>
                        <div class="flex">
                            <input v-model="schl.degree" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>

                    <td class="border border-slate-300">
                        <div class="p-1">
                            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">INCLUSIVE DATES</label>
                            <div class="flex justify-center">
                                <input id="inclusive_date" v-model="schl.date1" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                -
                                <input id="inclusive_date" v-model="schl.date2" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </div>
                    </td>

                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">HONORS RECEIVED</label>
                        <div class="flex">
                            <input v-model="schl.honors" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <button v-if="index > 0" class="delete-button" @click.prevent="deleteschl(index)">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6 text-red-600"
                                ><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </button>
                            <button v-if="index === schls.length - 1" class="add-button " @click="addschl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6 text-green-600 "
                                ><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </button>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="flex-1 text-[11px] w-32 font-medium text-gray-900 dark:text-white">MASTER THESIS</label>
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">TITLE</label>
                            <input id="master_title" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="dob" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE</label>
                            <input id="masters_date" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>

                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="flex-1 text-[11px] w-full font-medium text-gray-900 dark:text-white">DOCTOR DISSERTATION</label>
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">TITLE</label>
                            <input id="doctor_title" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="dob" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE</label>
                            <input id="doctor_date" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="block text-[11px] w-full font-medium text-gray-900 dark:text-white">PROFESSIONAL LICENSE (e.g, CPA, RN, etc.)</label>
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">TITLE</label>
                            <input id="proflicence_title" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="dob" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE</label>
                            <input id="proflicence_date" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="block text-[11px] w-full font-medium text-gray-900 dark:text-white">SPECIAL SKILLS</label>
                        </div>
                    </td>
                    <td colspan="4" class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white" />
                            <input id="special_skills" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="(PLEASE SPECIFY, eg., computer, driving, etc.)">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</template>

<script>
export default {
    data () {
        return {
            schls: [{ type: "", name: "", degree: "", date1: "", date2: "", honors: "" }],
        }
    },
    methods: {
        addschl () {
            this.schls.push({ type: "", name: "", degree: "", date1: "", date2: "", honors: "" })
        },
        deleteschl (index) {
            this.schls.splice(index, 1)
        },
    },
}
</script>
