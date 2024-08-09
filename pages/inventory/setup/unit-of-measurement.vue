<script  setup>
import { useUOM } from "@/stores/inventory/setup/uom"

const main = useUOM()
const { isEdit } = storeToRefs(main)
await main.getUOMCustom()
await main.getUOMStandard()
useHead({
    title: "Unit of Measurement",
})

</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_setup_unit_of_measurements,
        ])"
    >
        <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-4">
            <InventorySetupUnitOfMeasurementAddForm v-show="!isEdit"/>
            <InventorySetupUnitOfMeasurementEditForm v-show="isEdit"/>
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
