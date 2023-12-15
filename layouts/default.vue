<template>
  <div class="antialiased bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <LayoutHeaderNav></LayoutHeaderNav>
    <!-- Sidebar -->
    <aside class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidenav" id="drawer-navigation">
      <div class="scrollstyle overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <LayoutNavSidebar/>
      </div>
    </aside>
    <main class="p-4 md:ml-64 h-auto pt-20">
      <slot />
    </main>
  </div>
</template>

<style>
/* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.router-link-active {
  background: #CCE0FF;
  position: relative;
}

/* background: #dce6f5; */

.router-link-active::before{
    width: 4px;
    position: absolute;
    top: 9px;
    bottom: 9px;
    right: 0px;
    background: #0C66E4;
    content: "";
    border-radius:0 var(4px, 4px) var(4px, 4px) 0 ;
    /*  */
}
</style>

<script setup>
import { onMounted } from 'vue'
import { 
    initAccordions, 
    initCarousels, 
    initCollapses, 
    initDials, 
    initDismisses, 
    initDrawers, 
    initDropdowns, 
    initModals, 
    initPopovers, 
    initTabs, 
    initTooltips } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    // initFlowbite();
    initAccordions();
    initCarousels();
    initCollapses();
    initDials();
    initDismisses();
    initDrawers();
    initDropdowns();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
})
</script>


