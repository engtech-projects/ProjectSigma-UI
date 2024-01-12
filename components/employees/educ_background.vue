<template>
    <form action="">
        <div class="font-bold">
            EDUCATIONAL BACKGROUND
        </div>
        <table class="w-full border-collapse border border-slate-400 table-fixed">
            <tbody>
                <tr v-for="(educbg1, index) in educbgs1" :key="index">
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">ATTAINMENT</label>
                        <select id="attainment1" v-model="educbg1.attainment1" name="attainment1" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                            <option value="selected" selected>
                                --SELECT--
                            </option>
                            <option value="elem">
                                ELEMENTARY
                            </option>
                            <option value="highschool">
                                HIGHSCHOOL
                            </option>
                        </select>
                    </td>

                    <td colspan="3" class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NAME OF SCHOOL</label>
                        <div class="flex">
                            <input v-model="educbg1.schlname1" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>

                    <td class="border border-slate-300">
                        <div class="p-1">
                            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">YEAR GRADUATED</label>
                            <div class="flex justify-center">
                                <input id="inclusive_date" v-model="educbg1.yrgrad1" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <button v-if="index > 0" class="delete-button" @click.prevent="deleteschl1(index)">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6 text-red-600"
                                    ><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </button>
                                <button v-if="index === educbgs1.length - 1" class="add-button " @click="addschl1">
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
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <hr class="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700">

        <table class="w-full border-collapse border border-slate-400 table-fixed">
            <tr v-for="(educbg2, index) in educbgs2" :key="index">
                <td class="border border-slate-300 p-1">
                    <label for="small-input" class="block mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">ATTAINMENT</label>
                    <select id="attainment2" v-model="educbg2.attainment2" name="attainment2" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                        <option value="selected" selected>
                            --SELECT--
                        </option>
                        <option value="undergrad">
                            Undergrad
                        </option>
                        <option value="graduate">
                            Graduate
                        </option>
                        <option value="postgrad">
                            Postgrad
                        </option>
                        <option value="techvoc">
                            Techvoc
                        </option>
                    </select>
                </td>

                <td class="border border-slate-300 p-1">
                    <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">COURSE TAKEN</label>
                    <div class="flex">
                        <input v-model="educbg2.course" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NAME OF SCHOOL</label>
                    <div class="flex">
                        <input v-model="educbg2.schlname2" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">UNITS EARNED</label>
                    <div class="flex">
                        <input v-model="educbg2.units" type="number" min="0" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">ONGOING NO. OF UNITS TAKEN</label>
                    <div class="flex">
                        <input v-model="educbg2.ongoingunits" type="number" min="0" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>

                <td class="border border-slate-300">
                    <div class="p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">YEAR GRADUATED</label>
                        <div class="flex justify-center">
                            <input id="inclusive_date" v-model="educbg2.yrgrad2" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <button v-if="index > 0" class="delete-button" @click.prevent="deleteschl2(index)">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6 text-red-600"
                                ><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </button>
                            <button v-if="index === educbgs2.length - 1" class="add-button " @click="addschl2">
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
                    </div>
                </td>
            </tr>
        </table>
    </form>
</template>

<script>
export default {
    data () {
        return {
            educbgs1: [{ attainment1: "", schlname1: "", yrgrad1: "" }],
            educbgs2: [{ attainment2: "", course: "", units: "", schlname2: "", yrgrad2: "", ongoingunits: "" }],
        }
    },
    methods: {
        addschl1 () {
            this.educbgs1.push({ attainment1: "", schlname1: "", yrgrad1: "" })
        },
        deleteschl1 (index) {
            this.educbgs1.splice(index, 1)
        },
        addschl2 () {
            this.educbgs2.push({ attainment2: "", course: "", units: "", schlname2: "", yrgrad2: "", ongoingunits: "" })
        },
        deleteschl2 (index) {
            this.educbgs2.splice(index, 1)
        },
    },
}
</script>
