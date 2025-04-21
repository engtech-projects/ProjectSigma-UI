<script setup>

const form = defineModel({ required: true, type: Object })

</script>
<template>
    <div class="text-gray-500 p-2">
        <div class="flex flex-col gap-4 pt-4 w-full">
            <div class="flex flex-col gap-4 mb-5">
                <div class="flex flex-row justify-between gap-4">
                    <div class="w-full flex flex-col gap-2">
                        <InventoryWarehouseWithStockTransfer
                            v-model="form.warehouse_id"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
