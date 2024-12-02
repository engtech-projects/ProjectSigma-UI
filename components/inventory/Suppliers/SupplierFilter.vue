<script setup>
const state = defineModel("state", { type: Object, required: true })
</script>
<template>
    <div class="flex flex-row gap-4 p-2 items-center">
        <div>
            <LayoutFormPsTextInput v-model="state.params.company_name" class="w-full" title="Company Name" />
        </div>
        <div>
            <LayoutFormPsSelect
                v-model="state.params.type_of_ownership"
                :options-list="['Single Proprietorship', 'Partnership', 'Corporation']"
                class="w-full"
                title="Type of Ownership"
            />
        </div>
        <div>
            <LayoutFormPsTextInput v-model="state.params.contact_person_name" class="w-full" title="Contact Person Name" />
        </div>
        <div>
            <LayoutFormPsTextInput v-model="state.params.supplier_code" class="w-full" title="Supplier Code" />
        </div>
    </div>
</template>
