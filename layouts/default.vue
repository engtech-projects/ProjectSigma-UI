<template>
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
        <main class="p-4 md:ml-64 h-auto pt-20">
            <slot />
        </main>
        <!-- Sidebar -->
        <aside id="drawer-navigation" class="fixed top-0 left-0 w-64 z-50 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidenav">
            <div class="scrollstyle overflow-y-auto py-5 h-full bg-white dark:bg-gray-800">
                <LayoutNavSideBar />
            </div>
        </aside>
        <!-- Header -->
        <LayoutHeaderNav />
    </div>
</template>

<script setup>
</script>

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
</style>
<style scoped>
.modgroupParent:has(.router-link-exact-active) {
    position: relative;
}
.modgroupParent:has(.router-link-exact-active)::after {
    width: 4px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    background: #0C66E4;
    content: "";
    border-radius:0 var(4px, 4px) var(4px, 4px) 0 ;
}
.navParent:has(.router-link-exact-active) {
    background: #dfeafa;
    position: relative;
}
.router-link-exact-active {
    background: #a8cbff;
    position: relative;
}
.router-link-exact-active::after{
    width: 4px;
    position: absolute;
    top: 9px;
    bottom: 9px;
    right: 0px;
    background: #0C66E4;
    content: "";
    border-radius:0 var(4px, 4px) var(4px, 4px) 0 ;
}
</style>
