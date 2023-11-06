<template>

  
<div class="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
        <li class="mr-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg" id="pis-tab" data-tabs-target="#pis" type="button" role="tab" aria-controls="pis" aria-selected="false">PIS</button>
        </li>
        <li class="mr-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Staff Information Sheet</button>
        </li>
        
    </ul>
</div>
<div id="default-tab-content">
    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="pis" role="tabpanel" aria-labelledby="pis-tab">
        <Personalinfo />
    </div>

    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
      <EvenparNologo />

        <div class="flex p-2 mt-6">
          <div class="text-lg lg:text-2xl font-normal text-left mb-4 col-span-2">STAFF INFORMATION SHEET</div>
        </div>

        <div class="flex justify-center mb-6">
          <span class="text-xs font-nomal italic">This sheet is for employee's records & updates purposes. Kindly fill-in all inforamtion needed and just put N/A to any field that is already irrelevant to you. Immediately submit to HRD after completion.</span>
        </div>

        <div>
          <EmployeesCompInfo />
        </div>
    </div>
    
</div>



    
    <!-- <EvenparNologo />

    <div class="flex p-2 mt-6">
      <div class="text-lg lg:text-2xl font-normal text-left mb-4 col-span-2">STAFF INFORMATION SHEET</div>
    </div>

    <div class="flex justify-center">
      <span class="text-xs font-nomal italic">This sheet is for employee's records & updates purposes. Kindly fill-in all inforamtion needed and just put N/A to any field that is already irrelevant to you. Immediately submit to HRD after completion.</span>
    </div> -->

    <div>
      <!-- <EmployeesCompInfo /> -->
    </div>
    
</template>

<script setup>
definePageMeta({
  layout: "shell",
}),
  useHead({
    title: "Employees",
    meta: [{ name: "description", content: "STAFF INFORMATION SHEET" }],
  });
</script>

