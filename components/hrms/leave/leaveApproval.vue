<script setup>
import { useLeaveRequest } from "~/stores/hrms/leaveRequest"

const leaveRequest = useLeaveRequest()

</script>
<template>
    <div class="w-full">
        <HrmsSetupApprovalsList
            v-for="(approv, apr) in leaveRequest.payload.approvals"
            :key="apr"
            v-model="leaveRequest.payload.approvals[apr]"
        />
    </div>
</template>
