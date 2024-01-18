<template>
    <div>
        <div class="text-2xl font-normal mb-4  md:mt-0">
            Manpower Request
        </div>
        <hr>
        <div class="md:grid grid-cols-2 gap-4">
            <EmployeeManpowerReq />
            <div>
                <EmployeeManpowerMonitoringList />
                <!-- <ChartManpowerMonitor /> -->
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: "Employee Manpower Request",
})

</script>
