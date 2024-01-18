<template>
    <div>
        <div class="flex flex-col bg-zinc-50 min-h-screen">
            <main id="body">
                <slot />
            </main>
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
