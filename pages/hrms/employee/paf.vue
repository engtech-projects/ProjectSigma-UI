<script setup lang="ts">
useHead({
    title: "Personal Action Notice",
})
</script>

<template>
    <div>
        <div class="text-2xl font-normal mb-4 mt-10 md:mt-0">
            Personnel Action Form
        </div>
        <hr>
        <div class="md:flex gap-4">
            <HrmsEmployeePanPersonelActionForm />
            <div class="w-2/3">
                <HrmsEmployeePanAllPanList />
                <HrmsEmployeePanApprovalList />
                <HrmsEmployeePanMyPanList />
            </div>
        </div>
    </div>
</template>
