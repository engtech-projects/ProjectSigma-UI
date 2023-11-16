<template>
    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
            <li class="mr-2" role="presentation">
                <button class="inline-block p-4 border-b-2 rounded-t-lg" id="pis-tab" data-tabs-target="#pis" type="button" role="tab" aria-controls="pis" aria-selected="false">PIS</button>
            </li>
            <li class="mr-2" role="presentation">
                <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="staff-tab" data-tabs-target="#staff" type="button" role="tab" aria-controls="staff" aria-selected="false">Staff Information Sheet</button>
            </li>
        </ul>
    </div>
    <div id="default-tab-content">
        <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="pis" role="tabpanel" aria-labelledby="pis-tab">
            
            <InputFields />
        </div>
        <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="staff" role="tabpanel" aria-labelledby="staff-tab">
            
            <StaffinfoSheet />
        </div>
    </div>
</template>