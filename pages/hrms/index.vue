<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
    <div
      class="grid-cols-2 border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
    >
      <HrmsDashboardAnnouncementTimeline />
    </div>
    <div
      class="border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
    >
      <HrmsDashboardBirthdays
        :employees="employeesData"
        class="md: mt-2 md:mt-0 p-2"
      />
    </div>
    <div
      class="border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
    >
      <HrmsDashboardLates
        :employees="employeeslateData"
        class="md: mt-2 md:mt-0 p-2"
      />
    </div>
    <div
      class="border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
    >
      <HrmsDashboardAbsences
        :employees="employeesabsencesData"
        class="md: mt-2 md:mt-0 p-2"
      />
    </div>
    <div
      class="rounded-lg border-gray-300 dark:border-gray-600 h-full md:h-full"
    >
    <HrmsDashboardLatesAbsencesChart />
    </div>
    <div
      class="rounded-lg border-gray-300 dark:border-gray-600 h-full md:h-full"
    >
    <HrmsDashboardEmployeesChart />
    </div>
  </div>

</template>

<script setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

const employeesData = ref([
  { name: "John Mayer", avatar: "/avatarexample.png", birthday: "1990-05-15" },
  { name: "Jane Smith", avatar: "/avatarexample.png", birthday: "1990-05-15" },
  { name: "John Doe", avatar: "/avatarexample.png", birthday: "1990-05-15" },
  { name: "Mark Unico", avatar: "/avatarexample.png", birthday: "1990-05-15" },
  { name: "John Doe", avatar: "/avatarexample.png", birthday: "1990-05-15" },
  { name: "Mark Unico", avatar: "/avatarexample.png", birthday: "1990-05-15" },
]);

const employeeslateData = ref([
  { name: "John Mayer", avatar: "/avatarexample.png", late: "2" },
  { name: "Jane Smith", avatar: "/avatarexample.png", late: "3" },
  { name: "John Doe", avatar: "/avatarexample.png", late: "3" },
  { name: "Mark Unico", avatar: "/avatarexample.png", late: "3" },
  { name: "John Doe", avatar: "/avatarexample.png", late: "3" },
  { name: "Mark Unico", avatar: "/avatarexample.png", late: "2" },
]);

const employeesabsencesData = ref([
  { name: "John Mayer", avatar: "/avatarexample.png", absences: "2" },
  { name: "Jane Smith", avatar: "/avatarexample.png", absences: "3" },
  { name: "John Doe", avatar: "/avatarexample.png", absences: "3" },
  { name: "Mark Unico", avatar: "/avatarexample.png", absences: "3" },
  { name: "John Doe", avatar: "/avatarexample.png", absences: "3" },
  { name: "Mark Unico", avatar: "/avatarexample.png", absences: "2" },
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
