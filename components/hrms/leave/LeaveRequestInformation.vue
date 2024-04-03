<script setup>
import { useLeaveRequest } from "~/stores/hrms/leaveRequest"
const leaveRequest = useLeaveRequest()
</script>

<template>
    <div>
        {{ leaveRequest }}
    </div>
</template>
