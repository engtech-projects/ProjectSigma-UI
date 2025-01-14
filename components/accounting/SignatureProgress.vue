<template>
    <div class="flex items-center justify-between w-full">
        <div
            v-for="(step, index) in totalSteps"
            :key="index"
            class="flex items-center justify-center relative"
        >
            <div
                :class="{
                    'bg-green-500 text-white': index + 1 <= currentStep,
                    'bg-gray-300 text-gray-700': index + 1 > currentStep
                }"
                class="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-colors duration-300 z-10"
            >
                {{ index + 1 }}
            </div>

            <!-- Vertical line connecting steps -->
            <div
                v-if="index + 1 < totalSteps"
                class="absolute top-1/2 left-1 transform -translate-y-1/2 w-56 h-1 bg-gray-300"
                :class="{ 'bg-green-500': index + 1 < currentStep }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    totalSteps: number;
    currentStep: number;
  }>()
</script>

  <style scoped>
  /* No additional styles are needed with Tailwind */
  </style>
