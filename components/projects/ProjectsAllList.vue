<script setup>
</script>
<template>
    <LayoutBoards class="w-full">
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_ALL,
            ])"
        >
            <div class="w-1/3 flex flex-col mb-4">
                <label for="" class="text-black text-md">
                    PROJECT ID/LOCATION
                </label>
                <input type="text" class="w-full rounded-lg h-10 border border-gray-300">
            </div>
            <div class="flex justify-center items-center pb-2 text-gray-500 text-[12px] overflow-y-auto p-2 border min-h-[20rem] rounded-md mb-4">
                No records found.
            </div>
        </LayoutAcessContainer>
    </LayoutBoards>
</template>
