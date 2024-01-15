<template>
    <li>
        <button
            type="button"
            class="flex items-center w-full uppercase text-xs font-bold text-gray-900 rounded-lg transition duration-75 group dark:text-white  "
            :data-collapse-toggle="id"
            aria-expanded="true"
            @click="dp=!dp"
        >
            <span class="flex-1 text-left whitespace-nowrap">
                {{ title }}
            </span>
            <Icon
                v-if="dp"
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
        <div class="overflow-clip">
            <TransitionSlideDown>
                <ul v-if="dp" class="py-2 space-y-2">
                    <slot />
                </ul>
            </TransitionSlideDown>
        </div>
    </li>
    <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700">
</template>

<script setup lang="ts">
defineProps({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
})
const dp = ref(true)
</script>
