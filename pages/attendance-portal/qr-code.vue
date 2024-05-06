<script setup>
definePageMeta({
    layout: "guest",
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/dashboard",
    },
})
</script>
<template>
    <div>
        QR CODE
    </div>
</template>
