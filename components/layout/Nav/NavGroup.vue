<template>
    <div class="navParent rounded-lg">
        <button
            type="button"
            class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group dark:text-white"
            aria-controls="dropdown-sales"
            @click="t=!t"
        >
            <Icon
                :name="icon"
                class="flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                fill="currentColor"
            />
            <span class="flex-1 ml-3 text-left whitespace-nowrap">
                {{ title }}
            </span>

            <Icon
                v-if="t"
                name="mdi:chevron-up"
                class="w-6 h-6"
                fill="currentColor"
            />
            <Icon
                v-else
                name="mdi:chevron-down"
                class="w-6 h-6"
                fill="currentColor"
            />
        </button>
        <div class="overflow-clip pl-4">
            <PsTransitionSlideDown>
                <div v-show="t" class="space-y-2">
                    <slot />
                </div>
            </PsTransitionSlideDown>
        </div>
    </div>
</template>
<script setup lang="ts">

defineProps({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
})
const t = ref(false)
</script>
