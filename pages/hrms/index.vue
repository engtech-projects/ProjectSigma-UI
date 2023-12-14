<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
      <div
        class="grid-cols-2 border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
      >
        <HrmsDashboardAnnouncement class="mt-10 md:mt-0 p-2 " />
      </div>
      <div
        class="border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
      >
        <HrmsDashboardBirthdays :employees="employeesData" class="md: mt-2 md:mt-0 p-2" />
      </div>
      <div class="border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full">
        <HrmsDashboardLate :employees="employeeslateData" class="md: mt-2 md:mt-0 p-2" />
      </div>
      <div
        class=" rounded-lg border-gray-300 dark:border-gray-600 h-92 md:h-full"
      >
        <HrmsDashboardEmployeeStatus/>
      </div>
      <div
        class=" rounded-lg border-gray-300 dark:border-gray-600 h-full md:h-full"
      >
        <ChartEmployeeschart title="Employee Lates and Absences Chart" :labels="['Lates','Absences']" :datas="['22','40']" class="p-2"/>
      </div>
      <div
        class=" rounded-lg border-gray-300 dark:border-gray-600 h-full md:h-full"
      >
        <ChartEmployeeschart title="Employee Chart" :labels="['Accounting', 'Finance', 'HR', 'Legal', 'Engineer', 'Estimator', 'Equipment Operator', 'Marketing', 'Sales', 'IT', 'Field Staff', 'Operations']" :datas="['40', '20', '12', '14', '56', '45', '88', '65', '56', '49', '71', '92']" class="p-2"/>
      </div>
      
    </div>

    <!-- <div
      class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
    >
      5
    </div>
    
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      >
        6
      </div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      >
        7
      </div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      >
        8
      </div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      >
        9
      </div>
    </div>
    
    <div
      class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
    >
      10
    </div>

    <div class="grid grid-cols-2 gap-4">
      11
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
    </div> -->
</template>

<script setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

const employeesData = ref([
  { name: "John Mayer", avatar: "/avatarexample.png", late: "1990-05-15" },
  { name: "Jane Smith", avatar: "/avatarexample.png", late: "1990-05-15" },
  { name: "John Doe", avatar: "/avatarexample.png", late: "1990-05-15" },
  { name: "Mark Unico", avatar: "/avatarexample.png", late: "1990-05-15" },
  { name: "John Doe", avatar: "/avatarexample.png", late: "1990-05-15" },
  { name: "Mark Unico", avatar: "/avatarexample.png", late: "1990-05-15" },
]);

const employeeslateData = ref([
  { name: "John Mayer", avatar: "/avatarexample.png", late: "2" },
  { name: "Jane Smith", avatar: "/avatarexample.png", late: "3" },
  { name: "John Doe", avatar: "/avatarexample.png", late: "3" },
  { name: "Mark Unico", avatar: "/avatarexample.png", late: "3" },
  { name: "John Doe", avatar: "/avatarexample.png", late: "3" },
  { name: "Mark Unico", avatar: "/avatarexample.png", late: "2" },
]);

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});

definePageMeta({
  layout: "default",
}),
  useHead({
    title: "Dashboard",
    meta: [{ name: "description", content: "SIGMA Dashboard" }],
    bodyAttrs: {
      class: "test",
    },
  });
</script>
