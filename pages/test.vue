<script setup lang="ts">
definePageMeta({
  layout: "guest",
}),
  useHead({
    title: "Welcome",
  });
</script>

<template>

    <div class="grid grid-cols-2 gap-4 place-content-center h-52"></div>
  
    <div class="flex justify-center gap-6 p-4">
        <div class="justify-center w-1/2 border-t-4 border-t-teal-600 p-2 bg-slate-100 rounded-lg shadow-md">
          <div class="flex justify-center items-center">
            <div class="justify-center">
              <img class="w-50 h-8 rounded-md" src="/evenpar.jpg" alt="logo" />
            </div>
            <div>
              asdf
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 ">
          <div>
            <NuxtLink to="/hrms" class="flex justify-center items-center text-md font-semibold text-gray-900 dark:text-white border-t-4 border-t-teal-600 p-2 bg-slate-100 rounded-lg shadow-md hover:shadow-lg hover:shadow-teal-300 hover:ring-1 ring-teal-400">
              <div>
                <img class="w-[100px]" src="/hrms.png" alt="logo" />
                <div class="flex justify-center items-center text-xs text-emerald-400 font-bold mt-2">
                  HRMS
                </div>
              </div>
            </NuxtLink>
          </div>
          
          <div>
            <NuxtLink to="#" class="flex justify-center items-center text-md font-semibold text-gray-900 dark:text-white border-t-4 border-t-teal-600 p-2 bg-slate-100 rounded-lg shadow-md hover:shadow-lg hover:shadow-teal-300 hover:ring-1 ring-teal-400">
              <div>
                <img class="w-[100px]" src="/inventory.png" alt="logo" />
                <div class="flex justify-center items-center text-xs text-emerald-400 font-bold mt-2">
                  INVENTORY
                </div>
              </div>
            </NuxtLink>
          </div>
          
          <div>
            <NuxtLink to="#" class="flex justify-center items-center text-md font-semibold text-gray-900 dark:text-white border-t-4 border-t-teal-600 p-2 bg-slate-100 rounded-lg shadow-md hover:shadow-lg hover:shadow-teal-300 hover:ring-1 ring-teal-400">
              <div>
                <img class="w-[100px]" src="/accounting.png" alt="logo" />
                <div class="flex justify-center items-center text-xs text-emerald-400 font-bold mt-2">
                  ACCOUNTING
                </div>
              </div>
            </NuxtLink>
          </div>
          
          <div>
            <NuxtLink to="#" class="flex justify-center items-center text-md font-semibold text-gray-900 dark:text-white border-t-4 border-t-teal-600 p-2 bg-slate-100 rounded-lg shadow-md hover:shadow-lg hover:shadow-teal-300 hover:ring-1 ring-teal-400">
              <div>
                <img class="w-[100px]" src="/project_monitoring.png" alt="logo" />
                <div class="flex justify-center items-center text-xs text-emerald-400 font-bold mt-2 ">
                  PROJECT MONITORING
                </div>
              </div>
            </NuxtLink>
          </div>
          
        </div>
    </div>

  
</template>
