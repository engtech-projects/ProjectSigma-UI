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
                    {{ documentCode }}
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
                        {{ issueNunber }}
                    </td>
                    <td class="text-[12px] p-[1px] text-center border border-gray-500">
                        {{ revisionNumber }}
                    </td>
                    <td class="text-[12px] p-[1px] text-center border border-gray-500">
                        {{ effectiveDate }}
                    </td>
                    <td class="text-[12px] p-[1px] text-center border border-gray-500">
                        {{ page?.currentPage }} of {{ page?.totalPages }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    documentCode: {
        type: String,
        required: true,
    },
    page: {
        type: Object,
        default: () => ({
            currentPage: 1,
            totalPages: 1
        }),
    },
    effectiveDate: {
        type: String,
        default: "12-12-2024"
    },
    issueNunber: {
        type: String,
        default: "01"
    },
    revisionNumber: {
        type: String,
        default: "00"
    }
})

</script>

<style scoped>
* {
  font-family: Arial, sans-serif!important;
}

</style>
