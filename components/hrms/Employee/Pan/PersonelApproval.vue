<script setup>
import { usePersonelActionNotice } from "@/stores/hrms/pan"

const pan = usePersonelActionNotice()
const { personelActionNotice } = storeToRefs(pan)

</script>
<template>
    <div class="w-full">
        <HrmsSetupApprovalsList
            v-for="(approv, apr) in personelActionNotice.approvals"
            :key="apr"
            v-model="personelActionNotice.approvals[apr]"
        />
    </div>
</template>
