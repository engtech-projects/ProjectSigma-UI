<script lang="ts" setup>
import { useAccountType } from "~/stores/accounting/accounttype"

const accountType = useAccountType()
accountType.getAccountTypes()
</script>

<template>
    <LayoutBoards title="Create New Type" class="w-full h-fit">
        <form @submit.prevent="">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="account_number"
                        class="text-xs italic"
                    >Account Number</label>
                    <input
                        id="accountNumber"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div>
                    <label
                        for="class_name"
                        class="text-xs italic"
                    >Class</label>
                    <select
                        id="className"
                        class="w-full rounded-lg"
                        required
                    >
                        <option value="">
                            Option 1
                        </option>
                    </select>
                </div>
                <div>
                    <label
                        for="type_name"
                        class="text-xs italic"
                    >Type Name</label>
                    <input
                        id="typeName"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
            </div>

            <div class="flex justify-end">
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Type
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
