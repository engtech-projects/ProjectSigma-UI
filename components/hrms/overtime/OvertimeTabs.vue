<template>
    <LayoutBoards class="w-full" :loading="boardLoading">
        <div class="w-full">
            <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul id="default-tab" class="flex flex-wrap -mb-px text-sm font-medium text-center" data-tabs-toggle="#default-tab-content" role="tablist">
                    <li class="mr-2" role="presentation">
                        <button
                            id="pis-tab"
                            class="inline-block p-4 border-b-2 rounded-t-lg"
                            data-tabs-target="#pis"
                            type="button"
                            role="tab"
                            aria-controls="pis"
                            aria-selected="false"
                        >
                            List
                        </button>
                    </li>
                    <li class="mr-2" role="presentation">
                        <button
                            id="staff-tab"
                            class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            data-tabs-target="#staff"
                            type="button"
                            role="tab"
                            aria-controls="staff"
                            aria-selected="false"
                        >
                            My Request
                        </button>
                    </li>
                    <li class="mr-2" role="presentation">
                        <button
                            id="docsmemo-tab"
                            class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            data-tabs-target="#docsmemo"
                            type="button"
                            role="tab"
                            aria-controls="docsmemo"
                            aria-selected="false"
                        >
                            My Approvals
                        </button>
                    </li>
                </ul>
            </div>
            <div id="default-tab-content">
                <div id="pis" class="hidden bg-teal-50 p-1 dark:bg-gray-800" role="tabpanel" aria-labelledby="staff-tab">
                    <HrmsOvertimeList />
                </div>
                <div id="staff" class="hidden bg-teal-50 p-1 dark:bg-gray-800" role="tabpanel" aria-labelledby="staff-tab">
                    <HrmsOvertimeMyRequest />
                </div>
                <div id="docsmemo" class="hidden bg-teal-50 p-1 dark:bg-gray-800" role="tabpanel" aria-labelledby="docsmemo-tab">
                    <HrmsOvertimeMyApprovals />
                </div>
            </div>
        </div>
    </LayoutBoards>
</template>

<!-- <script setup>

const headers = [
    { text: "Employee Name", value: "employee_name" },
    { text: "Date Filed", value: "date_filed" },
    { text: "Requested Amount", value: "requested_amt" },
    { text: "Purpose", value: "purpose" },
    { text: "Repayment Term", value: "repayment_term" },
    { text: "Repayment Start.", value: "repayment_start" },
    { text: "Repayment Amount", value: "repayment_amt" },
    { text: "Balance", value: "balance" },
    { text: "Status", value: "status" },
    { text: "Action", value: "actions" },
]

const items = ref([
    {
        employee_name: "Miles A. Head",
        date_filed: "2017-10-10",
        requested_amt: "2,000.00",
        purpose: "medicine",
        repayment_term: "Semi-monthly",
        repayment_start: "2017-09-22 08:00:00",
        repayment_amt: "500",
        balance: "1,000.00",
        status: "Approved",
    },
    {
        employee_name: "Robin Banks",
        date_filed: "2017-10-10",
        requested_amt: "2,000.00",
        purpose: "medicine",
        repayment_term: "Semi-monthly",
        repayment_start: "2017-09-22 08:00:00",
        repayment_amt: "500",
        balance: "1,000.00",
        status: "Approved",
    },
    {
        employee_name: "Faye Kinnitt",
        date_filed: "2017-10-10",
        requested_amt: "2,000.00",
        purpose: "medicine",
        repayment_term: "Semi-monthly",
        repayment_start: "2017-09-22 08:00:00",
        repayment_amt: "500",
        balance: "1,000.00",
        status: "Approved",
    },
])

const approved = () => {
}

const deleted = () => {
}

const payment = () => {
}

const reject = () => {
}
</script> -->

<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
