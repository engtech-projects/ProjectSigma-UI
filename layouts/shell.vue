<template>
    <div>
        <div class="flex flex-col bg-zinc-50 min-h-screen">
            <!-- <LayoutHeader /> -->
            <main id="body">
                <!-- <LayoutApplication-shell /> -->
                <slot />
            </main>
            <!-- <LayoutFooter/> -->
        </div>
    </div>
</template>

<script setup>
import { initFlowbite } from "flowbite"

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite()
})
</script>
