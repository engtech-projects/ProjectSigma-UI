<template>
    <div class="overflow-auto">
        <EvenparNologo />
        <HrmsEmployee201DetailsEmployeeInfo />
        <HrmsEmployee201DetailsEmployeePermanentAddress />
        <HrmsEmployee201DetailsEmployeePresentAddress />
        <HrmsEmployee201DetailsEmployeeChildren />
        <HrmsEmployee201EducationPrimaryEducation />
        <HrmsEmployee201EducationSecondaryEducation />
        <HrmsEmployee201EducationCollegeEducation />
        <HrmsEmployee201EducationVocationalEducation />
        <HrmsEmployee201EducationStudiesBackground />
        <HrmsEmployee201DetailsSpouseInfo />
        <HrmsEmployee201DetailsContactPerson />
        <div v-if="false" class="mt-8 flex justify-end">
            <div>
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>
