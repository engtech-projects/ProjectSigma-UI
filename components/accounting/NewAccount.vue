<script lang="ts" setup>

</script>

<template>
    <LayoutBoards title="Create New Account" class="w-full">
        <form @submit.prevent="" action="">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="project_name"
                        class="text-xs italic"
                    >Type Name</label>
                    <select
                        name="type_name"
                        id="typeName"
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
                        for="account_name"
                        class="text-xs italic"
                    >Account Name</label>
                    <input
                        id="accountName"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div>
                    <label
                        for="contract_location"
                        class="text-xs italic"
                    >Bank Recon</label>
                    <select
                        name="bank_recon"
                        id="bankRecon"
                        class="w-full rounded-lg"
                        required
                    >
                        <option value="">
                            Option 1
                        </option>
                    </select>
                </div>
                <div class="flex gap-3 items-center">
                    <div class="flex flex-col">
                        <label
                            for="sub_account"
                            class="text-xs italic mb-1"
                        >Sub Account<a href=""></a></label>
                        <input
                            id="subAccount"
                            type="checkbox"
                            class="rounded-lg w-10 h-10"
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="contract_location"
                            class="text-xs italic"
                        >Bank Recon</label>
                        <input
                            id="contractLocation"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                </div>
                <div>
                    <label
                        for="description"
                        class="text-xs italic"
                    >Description</label>
                    <textarea
                        id="description"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label
                        for="opening_balance"
                        class="text-xs italic"
                    >Opening Balance</label>
                    <input
                        id="openingBalance"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div>
                    <label
                        for="as_of"
                        class="text-xs italic"
                    >As of</label>
                    <input
                        id="asOf"
                        type="date"
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
                    Add Account
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
