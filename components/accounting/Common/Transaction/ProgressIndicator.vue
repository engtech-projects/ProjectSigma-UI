<template>
    <div>
        <div
            :class="[
                'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                isComplete
                    ? 'bg-green-500 text-white'
                    : isInProgress
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-200 text-gray-400'
            ]"
        >
            <svg
                v-show="isPending"
                class="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                />
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
            <svg
                v-show="isComplete"
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                />
            </svg>
            <svg
                v-show="isInProgress"
                class="w-4 h-4 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </div>
    </div>
</template>

<script setup>
defineProps({
    isPending: {
        type: Boolean,
        required: false,
        default: false,
    },
    isComplete: {
        type: Boolean,
        required: false,
        default: false,
    },
    isInProgress: {
        type: Boolean,
        required: false,
        default: false,
    },
})
</script>
