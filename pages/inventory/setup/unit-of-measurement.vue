<script  setup>
import { storeToRefs } from "pinia"
import { usePhilhealthStore } from "@/stores/hrms/setup/philhealth"

const contributions = usePhilhealthStore()
const { isEdit } = storeToRefs(contributions)
contributions.getContribution()

useHead({
    title: "Unit of Measurement",
})

</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_setup_phil_health,
        ])"
    >
        <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-4">
            <InventorySetupUnitOfMeasurementAddForm v-show="!isEdit" />
            <HrmsPhilhealthEditContribution v-show="isEdit" />
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        title="Custom UOM"
                        target-id="customUOMList"
                    />
                    <HrmsCommonTabsTabTitle
                        title="Standard UOM"
                        target-id="standardUOMList"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="customUOMList">
                        <InventorySetupUnitOfMeasurementListCustomTable />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="standardUOMList">
                        <InventorySetupUnitOfMeasurementListStandardTable />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
