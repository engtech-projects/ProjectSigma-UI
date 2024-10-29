<script setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
const { userEmployeeHeadsEnum, headByPosition } = storeToRefs(enums)
onMounted(() => {
    if (!userEmployeeHeadsEnum.value.isLoaded) {
        enums.getUserEmployeeHeadsEnums()
    }
})
const head = computed(() => {
    return headByPosition.value("HEAD, HUMAN RESOURCE SECTION")
})
</script>
<template>
    <div class="flex flex-col gap-8">
        <span>CERTIFIED CORRECT BY:</span>
        <div class="flex flex-col gap-1 text-center">
            <span class="font-bold underline">
                {{ head ? head['employee']['fullname_first'] : "" }}
            </span>
            <span>
                HEAD, HUMAN RESOURCE SECTION
            </span>
        </div>
    </div>
</template>
