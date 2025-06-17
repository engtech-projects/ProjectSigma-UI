<template>
    <h2 class="text-lg font-semibold text-center mb-4">
        {{ title }}
    </h2>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_GROUP])"
        class="w-full mt-4"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_REQUESTLISTONGOING,
                    ])"
                    target-id="ongoing"
                    title="Ongoing"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_REQUESTLISTALL,
                    ])"
                    target-id="all"
                    title="All"
                />
            </template>

            <template #tab-containers>
                <!-- Ongoing Tab -->
                <HrmsCommonTabsTabContainer id="ongoing">
                    <div v-if="isShow" class="border border-gray-300 flex-1 rounded-md p-4 bg-white">
                        <LayoutPsTable
                            :header-columns="headers"
                            :actions="actions"
                            :datas="datas ?? []"
                            class="rounded-md"
                            @show-table="$emit('show-table', $event)"
                        />
                    </div>
                </HrmsCommonTabsTabContainer>

                <!-- All Tab -->
                <HrmsCommonTabsTabContainer id="all">
                    <div v-if="isShow" class="border border-gray-300 flex-1 rounded-md p-4 bg-white">
                        <LayoutPsTable
                            :header-columns="headers"
                            :actions="actions"
                            :datas="allDatas ?? []"
                            class="rounded-md"
                            @show-table="$emit('show-table', $event)"
                        />
                    </div>
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    isShow: Boolean,
    headers: {
        type: Array,
        required: true
    },
    datas: {
        type: Array,
        default: () => []
    },
    allDatas: {
        type: Array,
        default: () => []
    },
    actions: {
        type: Boolean,
    }
})

defineEmits(["show-table"])

useHead({
    title: "PROCUREMENT REQUESTS",
})
</script>
