<template>
    <div>
        <table>
            <tr>
                <th colspan="4" class="text-[12px] border border-gray-500 bg-[#dce5c8]">
                    DOCUMENT CODE NUMBER
                </th>
            </tr>
            <tr>
                <th colspan="4" class="border border-gray-500">
                    FM-IMS-001-1
                </th>
            </tr>
            <tr class="text-[12px] bg-[#dce5c8]">
                <th class="border border-gray-500">
                    ISSUE NO.
                </th>
                <th class="border border-gray-500">
                    REV NO.
                </th>
                <th class="border border-gray-500">
                    EFFECTIVE DATE
                </th>
                <th class="border border-gray-500">
                    PAGE NO.
                </th>
            </tr>
            <tbody>
                <tr>
                    <td class="text-[12px] p-[1px] text-center border border-gray-500">
                        01
                    </td>
                    <td class="text-[12px] p-[1px] text-center border border-gray-500">
                        00
                    </td>
                    <td class="text-[12px] p-[1px] text-center border border-gray-500">
                        12-12-2024
                    </td>
                    <td class="text-[12px] p-[1px] text-center border border-gray-500">
                        <!-- {{ page.currentPage }} of {{ page.totalPages }} -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>

defineProps({
    page: {
        type: Object,
        default: null,
    },
})

</script>

<style scoped>
* {
  font-family: Arial, sans-serif!important;
}

</style>
