<script setup>

const props = defineProps({
    sectionId: {
        type: Number,
        required: true,
    },
    selectType: {
        type: String,
        default: "single",
    },
    modelValue: Boolean, // For checkbox
    itemId: {
        type: Number,
        required: true,
    },
})

const emits = defineEmits(["update:modelValue", "update:itemId", "add-non-bom-item"])

const checkboxChecked = ref(props.modelValue)
const selectedItem = ref(props.itemId)

watch(checkboxChecked, val => emits("update:modelValue", val))
watch(selectedItem, val => emits("update:itemId", val))
</script>

<template>
    <div
        v-show="sectionId"
        class="w-full flex flex-col gap-2 rounded-md h-auto z-10"
    >
        <label class="text-lg font-bold text-center sticky top-0 bg-teal-200 z-10 p-2">
            Non BOM List
        </label>

        <label class="flex px-2 items-center text-sm font-medium text-gray-700 select-none">
            <input v-model="checkboxChecked" type="checkbox" class="mr-2">
            Add Non-BOM Items
        </label>

        <div v-if="checkboxChecked" class="flex items-center gap-4 p-2">
            <div class="flex-1">
                <InventoryBomItemSelector v-model="selectedItem" class="w-full" />
            </div>
            <button
                class="bg-green-600 text-white p-2 rounded hover:bg-green-800 flex items-center"
                @click.prevent="$emit('add-non-bom-item', selectedItem)"
            >
                Add Item
            </button>
        </div>
    </div>
</template>
