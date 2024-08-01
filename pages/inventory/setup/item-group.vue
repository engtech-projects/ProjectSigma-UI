<script setup>

// import { storeToRefs } from "pinia"
import { useItemStore } from "@/stores/inventory/setup/itemgroup"
import { useEnumsStore } from "@/stores/inventory/enum"

const approvals = useItemStore()
approvals.getApproval()

const enums = useEnumsStore()
enums.getUserEmployeeEnums()

useHead({
    title: "Item Group",
})
</script>

<template>
    <!-- <LayoutAcessContainer> -->
    <!-- </LayoutAcessContainer> -->
    <div class="flex flex-col md:flex-row gap-4">
        <div class="w-2/3">
            <InventorySetupItemGroupTable />
        </div>
    </div>
</template>
