<template>
    <h2 class="text-lg font-semibold text-center mb-4">
        {{ title }}
    </h2>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_GROUP])"
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
                    <LayoutLoadingContainer :loading="datas.isLoading">
                        <LayoutPsTable
                            v-if="isShow"
                            :header-columns="headers"
                            :actions="actions"
                            :datas="datas.list ?? []"
                            class="rounded-md"
                            @show-table="$emit('show-table', $event)"
                        />
                        <div class="flex justify-center mx-auto">
                            <CustomPagination :links="datas.pagination" @change-params="changePaginateOnGoing" />
                        </div>
                    </LayoutLoadingContainer>
                </HrmsCommonTabsTabContainer>
                <!-- All Tab -->
                <HrmsCommonTabsTabContainer id="all">
                    <LayoutLoadingContainer :loading="allDatas.isLoading">
                        <LayoutPsTable
                            v-if="isShow"
                            :header-columns="headers"
                            :actions="actions"
                            :datas="allDatas.list ?? []"
                            class="rounded-md"
                            @show-table="$emit('show-table', $event)"
                        />
                        <div class="flex justify-center mx-auto">
                            <CustomPagination :links="allDatas.pagination" @change-params="changePaginate" />
                        </div>
                    </LayoutLoadingContainer>
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
const changePaginateOnGoing = (newParams) => {
    datas.value.params.page = newParams.page ?? ""
}
const changePaginate = (newParams) => {
    allDatas.value.params.page = newParams.page ?? ""
}
</script>
