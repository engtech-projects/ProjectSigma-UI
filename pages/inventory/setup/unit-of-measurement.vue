<script setup>
import { useUOM } from "@/stores/inventory/setup/uom"

const main = useUOM()
const { isEdit, getParams } = storeToRefs(main)
useHead({
    title: "Unit of Measurement",
})
const changeType = (type) => {
    main.list = []
    getParams.value.filter = type
    main.getUOM()
}
main.getUOM()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_setup_unit_of_measurements,
        ])"
    >
        <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-4">
            <div>
                <InventorySetupUnitOfMeasurementAddForm v-show="!isEdit" />
                <InventorySetupUnitOfMeasurementEditForm v-show="isEdit" />
            </div>
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        title="Custom UOM"
                        target-id="customUOMList"
                        @click="changeType('custom')"
                    />
                    <HrmsCommonTabsTabTitle
                        title="Standard UOM"
                        target-id="standardUOMList"
                        @click="changeType('standard')"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="customUOMList">
                        <InventorySetupUnitOfMeasurementUOMTable />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="standardUOMList">
                        <InventorySetupUnitOfMeasurementUOMTable />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
