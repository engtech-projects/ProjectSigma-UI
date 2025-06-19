<template>
    <tbody>
        <tr>
            <td class="uppercase bg-yellow-200 text-center">
                Item A
            </td>
            <td class="uppercase bg-yellow-200 text-center">
                Facilities for Engineers
            </td>
            <td class="bg-yellow-200 py-1" colspan="4">
                <div class="flex gap-1 justify-end">
                    <button v-if="edit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-xs px-4 h-6" @click="showTaskModal = true">
                        Create Task
                    </button>
                    <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-lg text-xs px-4 h-6">
                        Remove
                    </button>
                </div>
            </td>
        </tr>
        <tr class="bg-gray-100">
            <td />
            <td class="uppercase text-xs font-semibold pt-2 text-center">
                Name and Specification
            </td>
            <td class="uppercase text-xs font-semibold pt-2 text-center">
                Quantity
            </td>
            <td class="uppercase text-xs font-semibold pt-2 text-center">
                Unit
            </td>
            <td class="uppercase text-xs font-semibold pt-2 text-center">
                Unit Cost
            </td>
            <td class="uppercase text-xs font-semibold pt-2 text-center">
                Amount
            </td>
        </tr>
        <slot />
    </tbody>
</template>
