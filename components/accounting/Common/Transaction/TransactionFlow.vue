<template>
    <div class="w-full max-w-4xl mx-auto">
        <!-- Header -->
        <div class="b-white text-gray-500 px-2 shadow-lg py-2">
            <div class="flex items-center gap-3">
                <h2 class="text-md font-bold">
                    PRF Transaction Flow
                </h2>
            </div>
        </div>

        <!-- Content Container -->
        <div class="bg-white rounded-b-xl shadow-lg overflow-hidden">
            <!-- Create Flow -->
            <div v-if="transactionOption === 'create'" class="p-2">
                <div class="space-y-4">
                    <div
                        v-for="(transactionFlowModel, index) in transactionFlowModelList"
                        :key="index"
                        class="relative group transition-all duration-300 hover:transform hover:scale-[1.02]"
                    >
                        <!-- Card -->
                        <div
                            :class="[
                                'relative z-10 rounded-xl p-2 border-1 transition-all duration-300',
                                index === 0
                                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-md'
                                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                            ]"
                        >
                            <div class="flex items-center gap-4">
                                <!-- Content -->
                                <div class="flex-1">
                                    <!-- Status Badge -->
                                    <div v-if="index === 0" class="mb-2">
                                        <span
                                            class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
                                        >
                                            <div class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                                            In Progress
                                        </span>
                                    </div>
                                    <!-- Step Name -->
                                    <p class="text-md font-semibold text-gray-800 leading-relaxed">
                                        {{ transactionFlowModel.name }}
                                    </p>
                                </div>

                                <!-- Progress Indicator -->
                                <div
                                    :class="[
                                        'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                                        index === 0
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-400'
                                    ]"
                                >
                                    <svg
                                        v-if="index === 0"
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
                                            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    <svg
                                        v-else
                                        class="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Management Flow -->
            <div v-else class="p-6 space-y-4">
                <!-- In Progress Item -->
                <div
                    class="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
                >
                    <div class="flex items-center gap-4">
                        <!-- Status Badge -->
                        <div class="flex-shrink-0">
                            <span
                                class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-yellow-500 text-white shadow-md"
                            >
                                <div class="w-2 h-2 bg-white rounded-full animate-pulse" />
                                In Progress
                            </span>
                        </div>

                        <!-- Content -->
                        <div class="flex-1 min-w-0">
                            <p class="text-lg font-medium text-gray-800 leading-relaxed">
                                Sample 1 ipsum dolor sit amet sample create
                            </p>
                        </div>

                        <!-- Action Button -->
                        <div class="flex-shrink-0">
                            <button
                                class="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                            >
                                Mark Done
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Completed Item -->
                <div
                    class="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
                >
                    <div class="flex items-center gap-4">
                        <!-- Content -->
                        <div class="flex-1">
                            <p class="text-lg font-medium text-gray-800 leading-relaxed">
                                Sample 2 ipsum dolor sit amet sample create
                            </p>
                        </div>

                        <!-- Success Icon -->
                        <div class="flex-shrink-0">
                            <div
                                class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                            >
                                <svg
                                    class="w-6 h-6 text-white"
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="transactionOption === 'create' && transactionFlowModelList.length > 0"
            class="mt-4 bg-white rounded-lg shadow-md p-4"
        >
            <div class="flex items-center gap-3">
                <span class="text-sm font-medium text-gray-600">Progress:</span>
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                        class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        :style="{ width: `${(1 / transactionFlowModelList.length) * 100}%` }"
                    />
                </div>
                <span class="text-sm font-medium text-gray-600">
                    1 of {{ transactionFlowModelList.length }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    transactionOption: {
        type: String,
        default: "create",
    },
    transactionFlowModelList: {
        type: Array,
        default: () => [],
    },
})
</script>

<style scoped>
/* Custom animations */
@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Smooth transitions for all interactive elements */
* {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}
</style>
