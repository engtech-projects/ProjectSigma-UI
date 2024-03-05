<template>
    <label for="employee_employment" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-6 italic">Dependents</label>
    <form v-for="(dependent, index) in dependents" :key="index" action="">
        <table class="w-full border-collapse border border-slate-400 table-fixed ">
            <tbody>
                <tr>
                    <td colspan="1" class="border border-slate-300 p-1">
                        <label for="dependent_name" class=" mb-2 text-xs w-32 font-bold text-gray-900 dark:text-white ">Name of Dependents</label>
                        <input id="dependent_name" v-model="dependent.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </td>
                    <td class="border border-slate-300 p-1 space-y-1">
                        <label for="dependent_date_of_birth" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Date of Birth</label>
                        <input id="dependent_date_of_birth" v-model="dependent.dob" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </td>

                    <td class="border border-slate-300 p-1">
                        <label for="dependent_age" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Age</label>
                        <div class="flex justify-start items-center gap-1">
                            <input id="dependent_age" v-model="dependent.age" type="number" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="dependent_relationship" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Relationship</label>
                        <div class="flex justify-start items-center gap-1">
                            <input id="dependent_relationship" v-model="dependent.relationship" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1 w-24">
                        <label for="dependent_dependent" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Dependent</label>
                        <div class="flex">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input id="dependent_dependent" v-model="dependent.dependent" type="checkbox" value="" class="sr-only peer">
                                <div class="w-11 h-6 bg-red-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                            </label>

                            <button v-if="index > 0" class="delete-button" @click.prevent="deleteDependents(index)">
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
                            <button v-if="index === dependents.length - 1" class="add-button" @click="addDependents">
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
            dependents: [{ name: "", dob: "", age: "", relationship: "", dependent: "" }],
        }
    },
    methods: {
        addDependents () {
            this.dependents.push({ name: "", dob: "", age: "", relationship: "", dependent: "" })
        },
        deleteDependents (index) {
            this.dependents.splice(index, 1)
        },

    },
}
</script>
