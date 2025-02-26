<template>
    <div class="flex flex-col gap-5">
        <div class="flex items-center justify-between">
            <span
                v-for="approval, index in approvals"
                :key="approval.name"
                class="text-[10px] text-gray-700 text-right"
                :class="{'flex-1': index > 0}"
            >
                {{ approval.name.replace('_', ' ').toUpperCase() + ' APPROVAL' }}
            </span>
        </div>
        <div class="flex items-center">
            <div
                v-for="approval, i in approvals"
                :key="approval.name"
                class="bg-gray-300 h-1 flex items-center justify-end"
                :class="{
                    'flex-1': i > 0,
                    'bg-red-500': approval.status === 'Denied',
                    'bg-yellow-300': approval.status === 'Pending',
                }"
            >
                <div
                    class="relative flex items-center justify-center h-8 w-8 rounded-full bg-gray-300"
                    :class="{
                        'bg-green-500': approval.status === 'Approved',
                        'bg-yellow-300': approval.status === 'Pending',
                        'bg-red-500': approval.status === 'Denied'
                    }"
                    @mouseover="popupIndex = i"
                    @mouseleave="popupIndex = null"
                >
                    <Icon v-if="approval.status === 'Approved'" name="iconamoon:check-bold" class="h-4 w-4 text-white" />
                    <Icon v-else-if="approval.status === 'Pending'" name="material-symbols:timelapse-outline-rounded" class="h-4 w-4 text-gray-700" />
                    <Icon v-else-if="approval.status === 'Denied'" name="flowbite:thumbs-down-solid" class="h-4 w-4 text-white" />
                    <Icon v-else name="material-symbols:timelapse-outline-rounded" class="h-4 w-4 text-white" />
                    <AccountingCommonStepperSignatureDetails
                        v-if="popupIndex === i"
                        :signatory="approvals[i]"
                        :i="i"
                        :position="i === approvals.length - 1 ? 'right' : 'left'"
                        :title="approval.name.replace('_', ' ').toUpperCase()"
                    />
                </div>
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
const approvals = computed(() => {
    const arr = []
    for (const i in props.signatories) {
        const appr = props.signatories[i]
        appr.name = i
        appr.status = appr.details.length > 0 ? determineStatus(appr) : "tbd"
        arr.push(appr)
    }
    return arr
})
const determineStatus = (appr: any) => {
    let err = "Approved"
    appr.details.forEach((d: any) => {
        if (d.status.toLowerCase() === "pending" && err !== "Denied") {
            err = "Pending"
        }
        if (d.status.toLowerCase() === "denied") {
            err = "Denied"
        }
    })
    return err
}
onMounted(() => {
    console.log(approvals.value)
})
</script>

  <style scoped>
  /* No additional styles are needed with Tailwind */
  </style>
