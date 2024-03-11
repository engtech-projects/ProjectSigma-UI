<script setup>
// import { usePersonelActionNotice } from "@/stores/hrms/pan"
// const pan = usePersonelActionNotice()
</script>
<template>
    <tr>
        <td colspan="4" class="border border-slate-300">
            <div class="p-1">
                <div class="space-x-2">
                    <label
                        for="nonexempt"
                        class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                    >Work Location:</label>
                    <input
                        id="nonexempt"
                        type="text"
                        value=""
                        class="inline w-80 p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                </div>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="4">
            <label
                for="small-input"
                class="flex w-full text-md font-medium text-blue-700 dark:text-white"
            >SALARY, BONUS, TITLE CHANGES</label>
        </td>
    </tr>

    <tr>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex justify-center text-xs font-bold text-gray-900 dark:text-white"
                >TYPE OF ADJUSTMENT</label>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex justify-center text-xs font-bold text-gray-900 dark:text-white"
                >PRESENT</label>
            </div>
        </td>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex justify-center text-xs font-bold text-gray-900 dark:text-white"
                >PROPOSED</label>
            </div>
        </td>
    </tr>
    <tr>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex text-xs font-normal text-gray-900 dark:text-white"
                >Semimonthly Salary (Full-time Exempt)</label>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                />
            </div>
        </td>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                />
            </div>
        </td>
    </tr>
    <tr>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex text-xs font-normal text-gray-900 dark:text-white"
                >Monthly Salary (Full-time Exempt)</label>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                />
            </div>
        </td>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                />
            </div>
        </td>
    </tr>
    <tr>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex text-xs font-normal text-gray-900 dark:text-white"
                >Annualized Salary (Full-time Exempt)</label>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                />
            </div>
        </td>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                />
            </div>
        </td>
    </tr>
    <tr>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex text-xs font-normal text-gray-900 dark:text-white"
                >Hourly Salary (Full-time Exempt)</label>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                />
            </div>
        </td>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                />
            </div>
        </td>
    </tr>
    <tr>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex text-xs font-normal text-gray-900 dark:text-white"
                >Bonus</label>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                />
            </div>
        </td>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                />
            </div>
        </td>
    </tr>
</template>
