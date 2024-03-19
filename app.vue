<script>

import {
    // initAccordions,
    // initCarousels,
    // initCollapses,
    // initDials,
    // initDismisses,
    // initDrawers,
    // initDropdowns,
    // initModals,
    // initPopovers,
    // initTabs,
    // initTooltips,
    initFlowbite
} from "flowbite"

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite()
    // initAccordions()
    // initCarousels()
    // initCollapses()
    // initDials()
    // initDismisses()
    // initDrawers()
    // initDropdowns()
    // initModals()
    // initPopovers()
    // initTabs()
    // initTooltips()
})
</script>
<template>
    <div>
        <NuxtLoadingIndicator />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <NuxtSnackbar />
    </div>
</template>
