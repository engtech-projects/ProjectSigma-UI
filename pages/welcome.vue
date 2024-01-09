<script setup lang="ts">

  useHead({
    title: "PROJECT SIGMA",
  });
</script>

<template>

    <div class="h-screen flex items-center justify-center gap-10">
        <div class="justify-center items-center w-1/2 border-y-4 border-y-teal-600 p-7 bg-white rounded-lg shadow-lg">
            <div class="flex justify-center bg-white mx-auto">
              <img class="flex justify-center w-32 rounded-md" src="/sigma.gif" alt="logo" />
            </div>
            <h1 class="tracking-widest text-lg text-center text-teal-700 italic">Your Comprehensive HR Management Solution</h1>
            <div>
                <div class="mt-5 text-xl">
                  <h1>Hello, Admin!</h1>
                  <p class="mt-5 text-sm">Welcome to your personalized HR dashboard. Here, you can manage various tasks efficiently.</p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4 ">
          <div>
            <NuxtLink to="/hrms" class="flex justify-center items-center text-md font-semibold text-gray-900 dark:text-white border-t-4 border-t-teal-600 p-2 bg-slate-100 rounded-lg shadow-md hover:shadow-lg hover:shadow-teal-500 ">
              <div>
                <img class="w-[100px]" src="/hrms.png" alt="logo" />
                <div class="flex justify-center items-center text-xs text-teal-600 font-bold mt-2">
                  HRMS
                </div>
              </div>
            </NuxtLink>
          </div>
          
          <div>
            <NuxtLink to="/" class="flex justify-center items-center text-md font-semibold text-gray-900 dark:text-white border-t-4 border-t-teal-600 p-2 bg-slate-100 rounded-lg shadow-md hover:shadow-lg hover:shadow-teal-500 ">
              <div>
                <img class="w-[100px]" src="/inventory.png" alt="logo" />
                <div class="flex justify-center items-center text-xs text-teal-600 font-bold mt-2">
                  INVENTORY
                </div>
              </div>
            </NuxtLink>
          </div>
          
          <div>
            <NuxtLink to="/" class="flex justify-center items-center text-md font-semibold text-gray-900 dark:text-white border-t-4 border-t-teal-600 p-2 bg-slate-100 rounded-lg shadow-md hover:shadow-lg hover:shadow-teal-500 ">
              <div>
                <img class="w-[100px]" src="/accounting.png" alt="logo" />
                <div class="flex justify-center items-center text-xs text-teal-600 font-bold mt-2">
                  ACCOUNTING
                </div>
              </div>
            </NuxtLink>
          </div>
          
          <div>
            <NuxtLink to="/" class="flex justify-center items-center text-md font-semibold text-gray-900 dark:text-white border-t-4 border-t-teal-600 p-2 bg-slate-100 rounded-lg shadow-md hover:shadow-lg hover:shadow-teal-500 ">
              <div>
                <img class="w-[100px] mx-5" src="/monitor.png" alt="logo" />
                <div class="flex justify-center items-center text-xs text-teal-600 font-bold mt-2">
                  PROJECT MONITORING
                </div>
              </div>
            </NuxtLink>
          </div>
          
        </div>
    </div>

</template>
