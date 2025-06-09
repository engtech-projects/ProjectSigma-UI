<script setup lang="ts">
defineProps({
    data: {
        type: Array<Object>,
        required: true,
    },
})
</script>
<template>
    <div class="bg-white w-full shadow sm:rounded-lg">
        <div class="border-t border-gray-200">
            <dl>
                <div v-for="field, _key in data" :key="_key" class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" :class="(_key % 2 === 0) ? 'bg-white' : 'bg-gray-50'">
                    <dt class="text-sm font-medium text-gray-500">
                        {{ field.label }}
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ field.value }}
                    </dd>
                </div>
            </dl>
        </div>
    </div>
</template>
