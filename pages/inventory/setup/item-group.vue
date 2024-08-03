<script setup>
import { useItemStore } from "@/stores/inventory/setup/itemgroup"
import { useEnumsStore } from "@/stores/inventory/enum"

const itemStore = useItemStore()
await itemStore.getItemGroups()

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
