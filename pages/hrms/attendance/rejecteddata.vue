<script setup lang="ts">
useHead({
    title: "Biometric Rejected Data",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>
<template>
    <LayoutAcessContainer
        :if-access="false"
    >
        <div class="mt-10 md:mt-0 md:flex gap-2">
            <HrmsAttendanceRejectedData />
        </div>
    </LayoutAcessContainer>
</template>
