<script setup lang="ts">
useHead({
    title: "Void Requests",
})
const compId = useId()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            'SUPER_ADMIN'
        ])"
    >
        <div class="grid grid-cols-1 md:flex-row gap-4">
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            'SUPER_ADMIN'
                        ])"
                        :target-id="'tab1' + compId"
                        title="All Request"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            'SUPER_ADMIN'
                        ])"
                        :target-id="'tab2' + compId"
                        title="My Request"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            'SUPER_ADMIN'
                        ])"
                        :target-id="'tab3' + compId"
                        title="My Approvals"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer
                        :id="'tab1' + compId"
                    >
                        <HrmsRequestsVoidAllRequests />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        :id="'tab2' + compId"
                    >
                        <HrmsRequestsVoidMyRequests />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        :id="'tab3' + compId"
                    >
                        <HrmsRequestsVoidMyApprovals />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
