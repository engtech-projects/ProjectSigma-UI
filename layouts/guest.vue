<script setup>

</script>
<template>
    <!-- <div class="dark:bg-teal-950 dark:text-slate-100"> -->
    <div class="flex flex-col bg-zinc-50 min-h-screen fixed left-0 right-0 spotlight z-10">
        <NuxtLoadingIndicator />
        <NuxtSnackbar />
        <main id="body" class="">
            <!-- login page -->
            <slot />
        </main>
    </div>
</template>
