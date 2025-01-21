<template>
    <div class="flex flex-col items-center justify-between w-full">
        <div class="flex items-center justify-between w-full mb-4">
            <span v-for="(step, index) in approvals" :key="index" class="text-xs text-center text-gray-700 flex-1">
                {{ step.title }}
            </span>
        </div>
        <div class="flex items-center justify-start w-full px-8">
            <div
                v-for="(step, index) in approvals"
                :key="index"
                class="flex items-center justify-start relative"
                :class="index < approvals.length - 1 ? 'flex-1' : ''"
                @mouseenter="showPopup(index)"
                @mouseleave="hidePopup"
            >
                <div
                    :class="{
                        'bg-green-500 text-white': index + 1 <= currStep,
                        'bg-gray-300 text-gray-700': index + 1 > currStep,
                        'bg-yellow-300 text-gray-700': index + 1 === currStep + 1
                    }"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-colors duration-300 z-10"
                >
                    <Icon v-if="index + 1 <= currStep" name="iconamoon:check-bold" class="h-4 w-4" />
                    <Icon v-else-if="index + 1 === currStep + 1" name="material-symbols:play-arrow" class="h-4 w-4" />
                    <Icon v-else name="material-symbols:timelapse-outline-rounded" class="h-4 w-4" />
                </div>

                <!-- Vertical line connecting steps -->
                <div
                    v-if="index + 1 < approvals.length"
                    class="absolute top-1/2 left-1 transform -translate-y-1/2 w-full h-1 bg-gray-300"
                    :class="{
                        'bg-green-500': index + 1 < currStep,
                        'bg-yellow-400': index + 1 === currStep
                    }"
                />
                <AccountingCommonStepperSignatureDetails
                    v-if="popupIndex === index"
                    :signatory="approvals[index]"
                    :index="index"
                    :position="index === approvals.length - 1 ? 'right' : 'left'"
                    :title="step.title"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    signatories: {
        type: Object,
        default: null
    }
})
const popupIndex = ref<number | null>(null)
const currStep = computed(() => {
    let curr = 0
    let step = 0
    for (const i in props.signatories) {
        const details = props.signatories[i].details ? props.signatories[i].details : props.signatories[i].data
        details.forEach((d) => {
            if (d.status.toLowerCase() !== "approved") {
                curr = step
            }
        })
        step = step + 1
    }
    return curr === 0 ? step : curr
})
const approvals = computed(() => {
    const arr = []
    for (const i in props.signatories) {
        const appr = props.signatories[i]
        appr.name = i
        arr.push(appr)
    }
    return arr
})
const showPopup = (index: number) => {
    popupIndex.value = index
}
const hidePopup = () => {
    popupIndex.value = null
}
</script>

  <style scoped>
  /* No additional styles are needed with Tailwind */
  </style>
