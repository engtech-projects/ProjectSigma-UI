<template>
    <div class="text-2xl font-normal mb-6">
      Personnel Information Sheet 
    </div>
    <EvenparHeader />
  
    <div class="flex p-2 mt-6">
      <div class="text-lg lg:text-2xl font-normal text-left mb-4 col-span-2">EMPLOYMENT APPLICATION FORM</div>
    </div>

    <div class="flex items-center mt-10 gap-4">
      <div class="italic font-bold">
      EMPLOYEE INFORMATION
      </div>
      <span class="block text-center text-xs font-medium text-red-700 italic">(note: please do not leave blank spaces. Write N/A for not applicable)</span>
    </div>
    <div class="rounded-md p-2 mt-4 ">
      <EmployeeInfo />
    </div>
    
    <div class="flex p-2 mt-6">
      <div class="flex items-center">
        <div class="italic font-bold">
        EDUCATION
        </div>
      </div>
    </div>
    <div class="rounded-md p-2 mt-4 ">
      <EmployeeEducation />
    </div>

    <div class="flex p-2 mt-6">
      <div class="flex items-center">
        <div class="italic font-bold">
        EMPLOYMENT (Start with the most recent or present employer)
        </div>
      </div>
    </div>
    <div class="rounded-md p-2 mt-4 ">
      <EmployeeEmployment />
    </div>
    
    <div class="flex p-2 mt-6">
      <div class="flex items-center">
        <div class="italic font-bold">
        EMPLOYMENT RECORD AT THIS COMPANY
        </div>
      </div>
    </div>
    <div class="rounded-md p-2 mt-4 ">
      <EmployeeEmploymentRecord />
    </div>
    
    
    <div class="flex p-2 mt-6">
      <div class="flex items-center">
        <div class="italic font-bold">
        TRAININGS AND SEMINARS
        </div>
      </div>
    </div>
    <div class="rounded-md p-2 mt-4 ">
      <EmployeeTrainings />
    </div>
    
    <div class="flex p-2 mt-6">
      <div class="flex items-center">
        <div class="italic font-bold">
        MEMBERSHIP IN ORGANIZATIONS AND CLUBS
        </div>
      </div>
    </div>
    <div class="rounded-md p-2 mt-4 ">
      <EmployeeMembership />
    </div>

    <div class="flex p-2 mt-6">
      <div class="flex items-center">
        <div class="italic font-bold">
        REFERENCES (Exclude relatives)
        </div>
      </div>
    </div>
    <div class="rounded-md p-2 mt-4 ">
      <EmployeeReferences />
    </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
}),
  useHead({
    title: "Employment Application",
    meta: [{ name: "description", content: "New Employee" }],
  });
</script>
