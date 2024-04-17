<template>
    <LayoutBoards title="Cash Advances" class="w-full" :loading="boardLoading">
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
                    <HrmsCashadvanceList />
                </div>
                <div id="staff" class="hidden bg-teal-50 p-1 dark:bg-gray-800" role="tabpanel" aria-labelledby="staff-tab">
                    <HrmsCashadvanceMyRequest />
                </div>
                <div id="docsmemo" class="hidden bg-teal-50 p-1 dark:bg-gray-800" role="tabpanel" aria-labelledby="docsmemo-tab">
                    <HrmsCashadvanceMyApprovals />
                </div>
            </div>
        </div>
    </LayoutBoards>
</template>

<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
