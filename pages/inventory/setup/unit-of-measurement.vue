<script  setup>
import { useUOM } from "@/stores/inventory/setup/uom"

const main = useUOM()
const { isEdit, isStandard } = storeToRefs(main)
useHead({
    title: "Unit of Measurement",
})
const standard = async (type) => {
    main.list = []
    isStandard.value = type
    await main.getUOM()
}
standard(false)
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_setup_unit_of_measurements,
        ])"
    >
        <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-4">
            <InventorySetupUnitOfMeasurementAddForm v-show="!isEdit" />
            <InventorySetupUnitOfMeasurementEditForm v-show="isEdit" />
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        title="Custom UOM"
                        target-id="customUOMList"
                        @click="standard(false)"
                    />
                    <HrmsCommonTabsTabTitle
                        title="Standard UOM"
                        target-id="standardUOMList"
                        @click="standard(true)"
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
