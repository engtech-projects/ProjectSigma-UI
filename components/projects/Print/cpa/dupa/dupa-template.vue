<template>
    <div class="flex flex-col">
        <AccountingLoadScreen :is-loading="false" />
        <h1 class="text-2xl text-black uppercase font-semibold text-center mb-6">
            Summary of Rates
        </h1>
        <div class="flex flex-col gap-2">
            <h3 class="text-gray-500 uppercase text-md text-center">
                Cost of sample
            </h3>
            <div class="flex flex-col border-t border-blue-500 border-dashed">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                1
                            </td>
                            <td class="w-3/12">
                                <div class="flex flex-between w-full">
                                    <span class="flex-1 text-right">1</span>
                                    <span class="flex-1 text-center">/</span>
                                    <span class="flex-1 text-left">unit example</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="flex justify-end py-4 pt-6">
            <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-12 h-8">
                <Icon name="ic:outline-local-printshop" class="text-white h-6 w-6" />
            </button>
        </div>
    </div>
</template>
