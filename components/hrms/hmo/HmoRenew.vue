<script setup>
import { useModalStore } from "~/stores/modal"
const modalStore = useModalStore()
const employees = ref([])
const currentEmployee = ref({})
const newMember = ref({
    firstname: null,
    middlename: null,
    lastname: null
})

async function fetchEmployees () {
    await useHRMSApi(
        "/api/employee/resource",
        {
            onResponse: ({ response }) => {
                if (response.ok) {
                    employees.value = response._data?.data
                } else {
                    throw new Error(response._data.message)
                }
            },
        }
    )
}

function addMember () {
    currentEmployee.value.members.push(newMember.value)
    modalStore.hideModal()
    newMember.value = {
        firstname: null,
        middlename: null,
        lastname: null
    }
}
function removeMember (members, member) {
    const arr = members.filter(m => m !== member)
    return arr
}
function setAddEmployee (emp) {
    currentEmployee.value = emp
    modalStore.showModal()
}
const hmoEmployees = computed(() => {
    const empList = []
    employees.value.forEach((emp) => {
        emp.members = []
        emp.checked = true
        empList.push(emp)
    })
    return empList
})

onMounted(async () => {
    await fetchEmployees()
})
</script>

<template>
    <div
        class="border-t-8 border-blue-500 mt-5 edit-item w-full max-w-full bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto"
    >
        <label
            for=""
            class="text-xl font-semibold text-gray-900"
        >Renew HMO</label>

        <div class="mt-5 b-6">
            <label
                for="hmo-amount"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Amount</label>
            <input
                id="hmoAmount"
                type="number"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0.00"
                required
            >
        </div>

        <div class="mt-5 b-6">
            <label
                for="hmo_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >HMO Name</label>
            <input
                id="hmoName"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
            >
        </div>

        <div class="flex gap-4">
            <div class="mt-5 b-6 flex-1">
                <label
                    for="hmo_start"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >HMO Start</label>
                <input
                    id="hmoStart"
                    type="date"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                >
            </div>
            <div class="mt-5 b-6 flex-1">
                <label
                    for="hmo_end"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >HMO End</label>
                <input
                    id="hmoEnd"
                    type="date"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                >
            </div>
        </div>

        <div class="mt-5 mb-6">
            <label
                for="employee"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Employees</label>
            <div class="flex flex-col p-4">
                <div v-for="emp in hmoEmployees" :key="emp.id" class="flex flex-col">
                    <div class="flex justify-between py-2 border-b border-slate-100">
                        <div class="flex gap-2 items-center">
                            <input v-model="emp.checked" type="checkbox">
                            <span class="text-md text-slate-800">
                                {{ emp.family_name + ", " + emp.first_name + " " + emp.middle_name[0].toUpperCase() + "." }}
                            </span>
                        </div>
                        <Icon name="iconoir:plus" class="text-2xl text-slate-800 hover:text-blue-500 cursor-pointer" @click="setAddEmployee(emp)" />
                    </div>
                    <div v-if="emp.members.length > 0" class="flex flex-col gap-1 bg-slate-100 rounded">
                        <div v-for="member,i in emp.members" :key="i" class="flex justify-between items-center hover:bg-slate-200 px-4 py-1 border-b border-white">
                            <div class="flex gap-2">
                                <Icon v-if="i===0" name="iconoir:long-arrow-down-right" />
                                <span v-else class="w-4" />
                                <span class="text-sm">{{ member.lastname + ", " + member.firstname + " " + member.middlename[0].toUpperCase() + "." }}</span>
                            </div>
                            <Icon name="iconoir:trash" class="text-slate-700 hover:text-red-500 cursor-pointer" @click="emp.members = removeMember(emp.members, member)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-end gap-4">
            <NuxtLink
                to="/hrms/hmo"
                class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
            >
                Cancel
            </NuxtLink>
            <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="hmoStore.createHmo()"
            >
                Renew
            </button>
        </div>

        <ModalContainer size="modal-sm" title="Membership Addon">
            <form class="flex flex-col px-4 py-2 gap-2" @submit.prevent="addMember">
                <div>
                    <label
                        for="firstname"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Firstname</label>
                    <input
                        id="firstname"
                        v-model="newMember.firstname"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                    >
                </div>
                <div>
                    <label
                        for="middlename"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Middlename</label>
                    <input
                        id="middlename"
                        v-model="newMember.middlename"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                    >
                </div>
                <div>
                    <label
                        for="lastname"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Lastname</label>
                    <input
                        id="lastname"
                        v-model="newMember.lastname"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                    >
                </div>
                <div class="flex justify-end gap-4 mt-4">
                    <button
                        class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                        @click.prevent="modalStore.hideModal"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Add
                    </button>
                </div>
            </form>
        </ModalContainer>
    </div>
</template>
