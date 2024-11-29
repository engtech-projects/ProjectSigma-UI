<script setup>
</script>
<template>
    <LayoutBoards v-if="information" title="Project Information" class="w-full md:w-3/4" :loading="boardLoading">
        
        <div class="w-full m-2 flex justify-between">
            <p class="text-3xl font-light">
                {{ information.project_identifier }} <span class="text-sm font-thin">Code : <span class="text-cyan-700">{{ information.project_code }}</span> </span>
            </p>
            <p class="m-2">
                <span class="text-cyan-700"> Date of Contract :</span> {{ information.date_of_contract }}
            </p>
        </div>
        <div class="border-t border-gray-200">
            <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-cyan-700">
                        Contract Name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ information.contract_name }}
                    </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-cyan-700">
                        Contract Location
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ information.contract_location }}
                    </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-cyan-700">
                        Implementing Officer
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ information.implementing_office }}
                    </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-cyan-700">
                        Status
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ information.status }}
                    </dd>
                </div>
            </dl>
        </div>
        <div class="bg-white shadow-md rounded-md overflow-hidden">
            <div class="bg-gray-100 py-2 px-4">
                <h2 class="text-xl font-semibold text-gray-800">
                    Project Members
                </h2>
            </div>
            <div v-if="information.employees?.project_members" class="divide-gray-200 p-4">
                <div v-for="(member, index) in information.employees.project_members" :key="index" class="flex items-left">
                    <span class="text-gray-700 text-lg font-medium mr-4"> {{ index + 1 }}. </span>
                    <div class="flex-1">
                        <h3 class="text-lg font-medium text-gray-800">
                            {{ member.fullname_last }}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </LayoutBoards>
</template>

<style scoped>

#overtime_form .vue3-easy-data-table__footer{
    display: none !important;
}

.add-btn-not-active, .remove-btn-not-active{
    display: none;
}
</style>
