<script setup>
const config = useRuntimeConfig()
defineProps({
    applicant: {
        type: Object,
        required: true,
    },
})
</script>
<template>
    <div>
        <h2 class="flex text-xl font-semibold mb-2 bg-slate-100 p-2 rounded-t-lg">
            Applicant {{ applicant.firstname }} {{ applicant.middlename }} {{ applicant.lastname }}
        </h2>
        <div class="grid grid-cols-3 gap-8 p-4">
            <div>
                <p class="font-semibold italic">
                    Application Letter Attachment:
                </p>
                <p class="truncate hover:cursor-pointer hover:text-blue-500 italic">
                    <a target="_blank" :href="config.public.HRMS_API_URL + '/storage/' + applicant.application_letter_attachment">
                        <Icon
                            name="mage:file-download-fill"
                            class="h-5 w-5 lg:h-5 lg:w-5"
                        />
                        Download Application Letter
                    </a>
                </p>
            </div>
            <div>
                <p class="font-semibold italic">
                    Resume:
                </p>
                <p class="truncate hover:cursor-pointer hover:text-blue-500 italic">
                    <a target="_blank" :href="config.public.HRMS_API_URL + '/storage/' + applicant.resume_attachment">
                        <Icon name="mage:file-download-fill" class="h-5 w-5 lg:h-5 lg:w-5" />
                        Download Resume
                    </a>
                </p>
            </div>
            <div>
                <p class="font-semibold italic">
                    Desired Position:
                </p>
                <p>{{ applicant.desired_position }}</p>
            </div>
            <div>
                <p class="font-semibold italic">
                    Date of Application:
                </p>
                <p>{{ applicant.date_of_application }}</p>
            </div>
        </div>
        <hr>
        <div class="grid grid-cols-3 gap-8 p-4">
            <div>
                <p class="font-semibold italic">
                    Personal Information:
                </p>
                <p>{{ applicant.firstname }} {{ applicant.middlename }} {{ applicant.lastname }} {{ applicant.name_suffix }}</p>
            </div>
            <div>
                <p class="font-semibold italic">
                    Date of Birth:
                </p>
                <p>{{ applicant.date_of_birth }}</p>
            </div>
            <div>
                <p class="font-semibold italic">
                    Contact Info:
                </p>
                <p>{{ applicant.contact_info }}</p>
            </div>
            <div>
                <p class="font-semibold italic">
                    Email:
                </p>
                <p>
                    <a :href="'mailto:'+applicant.email" class="cursor-pointer hover:text-blue-500">{{ applicant.email }}</a>
                    <!-- {{ applicant.email }} -->
                </p>
            </div>
            <div>
                <p class="font-semibold italic">
                    Present Address:
                </p>
                <p>{{ applicant.pre_address_street }} {{ applicant.pre_address_brgy }} {{ applicant.pre_address_city }} {{ applicant.pre_address_province }} {{ applicant.pre_address_zip }}</p>
            </div>
            <div>
                <p class="font-semibold italic">
                    Permanent Address:
                </p>
                <p>{{ applicant.per_address_street }} {{ applicant.per_address_brgy }} {{ applicant.per_address_city }} {{ applicant.per_address_province }} {{ applicant.per_address_zip }}</p>
            </div>
            <div>
                <p class="font-semibold italic">
                    Name of Spouse:
                </p>
                <p>{{ applicant.name_of_spouse }}</p>
            </div>
            <div>
                <p class="font-semibold italic">
                    Date of Birth (Spouse):
                </p>
                <p>{{ applicant.date_of_birth_spouse }}</p>
            </div>
            <div>
                <p class="font-semibold italic">
                    Contact Number (Spouse):
                </p>
                <p>{{ applicant.telephone_spouse }}</p>
            </div>
            <div v-for="(child, childIndex) in applicant.children" :key="childIndex">
                <p class="font-semibold italic">
                    Children:
                </p>
                <p>Name: {{ child.name }}</p>
                <p>Birthdate: {{ child.birthdate }}</p>
            </div>
        </div>
        <hr>
        <div class="grid grid-flow-col auto-cols-max gap-8 p-4">
            <p class="font-semibold italic">
                Work Experience:
            </p>
            <div v-for="(work, workIndex) in applicant.workexperience" :key="workIndex">
                <div>
                    <p>Position: {{ work.position_title }}</p>
                    <p>Department/Agency/Office/Company: {{ work.dpt_agency_office_company }}</p>
                    <p>Status of Appointment: {{ work.status_of_appointment }}</p>
                    <p>Inclusive Dates From: {{ work.inclusive_dates_from }}</p>
                    <p>Inclusive Dates To: {{ work.inclusive_dates_to }}</p>
                    <p>Monthly Salary: {{ work.monthly_salary }}</p>
                </div>
            </div>
        </div>
        <hr>
        <div class="grid grid-cols-3 gap-8 p-4">
            <div>
                <p class="font-semibold italic">
                    How did your learn about our company?
                </p>
                <p>{{ applicant.how_did_u_learn_about_our_company }}</p>
            </div>
            <div>
                <p class="font-semibold italic">
                    Currently Employed?
                </p>
                <p>{{ applicant.currently_employed }}</p>
            </div>
            <div>
                <p class="font-semibold italic">
                    In Case of Emergency:
                </p>
                <p>{{ applicant.icoe_name }}</p>
            </div>
            <div>
                <p class="font-semibold italic">
                    Address:
                </p>
                <p>{{ applicant.icoe_street }} {{ applicant.icoe_brgy }} {{ applicant.icoe_city }}, {{ applicant.icoe_province }}, {{ applicant.icoe_zip }}</p>
            </div>
            <div>
                <p class="font-semibold italic">
                    Relationship:
                </p>
                <p>{{ applicant.icoe_relationship }}</p>
            </div>
            <div>
                <p class="font-semibold italic">
                    Telephone:
                </p>
                <p>{{ applicant.telephone_icoe }}</p>
            </div>
            <p class="font-semibold italic">
                Education:
            </p>
            <div v-for="(educ, educIndex) in applicant.education" :key="educIndex">
                <div class="flex gap-8 min-w-max">
                    <div>
                        <p class="font-semibold italic">
                            {{ educ.type.toUpperCase() }}
                        </p>
                        <p>Name of School: {{ educ.name }}</p>
                        <p>From: {{ educ.period_attendance_from }}</p>
                        <p>To: {{ educ.period_attendance_to }}</p>
                        <p>Year Graduated: {{ educ.year_graduated }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
