<template>
    <div>
        <div class="text-2xl font-normal mb-4 mt-10 md:mt-0">
            Personnel Information Sheet
        </div>
        <hr>
        <EvenparHeader class="mt-6 " />

        <div class="flex p-2 mt-6 justify-center lg:justify-left ">
            <div class="text-xl font-medium text-left mb-4 col-span-2">
                EMPLOYMENT APPLICATION FORM
            </div>
        </div>

        <div class="flex p-2 mt-6">
            <div class="flex items-center">
                <div class="italic font-bold">
                    EMPLOYEE INFORMATION
                    <span class="block text-center text-xs font-medium text-red-700 italic">(note: please do not leave blank spaces. Write N/A for not applicable)</span>
                </div>
            </div>
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
    </div>
</template>

<script setup>
useHead({
    title: "Employment Application",
    meta: [{ name: "description", content: "New Employee" }],
})

</script>
