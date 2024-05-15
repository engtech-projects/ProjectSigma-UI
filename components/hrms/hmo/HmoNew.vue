<script type="ts" setup>
import { useModalStore } from "~/stores/modal"
import { useHMOStore } from "~/stores/hrms/setup/hmo"

const hmoStore = useHMOStore()
const modalStore = useModalStore()
const employees = ref([])
const currentEmployee = ref({})
const isLoading = ref(false)
const searchInput = ref("")
const snackbar = useSnackbar()
const newMember = ref({
    hmo_id: null,
    member_type: null,
    employee_id: null,
    member_name: null,
    member_belongs_to: null,
})

function generateFinalMembers () {
    const members = ref([])
    hmoEmployees.value.forEach((emp) => {
        if (emp.checked) {
            members.value.push({
                hmo_id: null,
                member_type: "employee",
                employee_id: emp.id,
                member_name: emp.first_name + " " + emp.family_name,
                member_belongs_to: null
            })
            if (emp.members.length > 0) {
                emp.members.forEach((mem) => {
                    members.value.push({
                        hmo_id: null,
                        member_type: "external(addon)",
                        employee_id: null,
                        member_name: mem.firstname + " " + mem.lastname,
                        member_belongs_to: emp.id
                    })
                })
            }
        }
    })
    return JSON.stringify(members.value)
}

async function handleSubmit () {
    hmoStore.hmo.hmo_members = generateFinalMembers()
    try {
        isLoading.value = true
        await hmoStore.createHmo()
        if (hmoStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: hmoStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: hmoStore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: hmoStore.errorMessage
        })
    } finally {
        isLoading.value = false
        await navigateTo("/hrms/setup/hmo")
    }
}

async function fetchEmployees () {
    await useHRMSApi(
        "/api/employee/list",
        {
            onResponse: ({ response }) => {
                if (response.ok) {
                    employees.value = setEmployees(response._data?.data)
                } else {
                    throw new Error(response._data.message)
                }
            },
        }
    )
}

function setEmployees (employees) {
    const empList = []
    employees.forEach((emp) => {
        emp.members = []
        emp.checked = true
        empList.push(emp)
    })
    return empList
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
    if (searchInput.value.length > 2) {
        return empList.filter(val =>
            val.first_name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            val.family_name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            (val.family_name.toLowerCase() + " " + val.first_name.toLowerCase()).includes(searchInput.value.toLowerCase()) ||
            (val.first_name.toLowerCase() + " " + val.family_name.toLowerCase()).includes(searchInput.value.toLowerCase())
        )
    }
    return empList
})

onMounted(async () => {
    await fetchEmployees()
})
</script>

<template>
    <div class="relative">
        <div v-if="isLoading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center z-50">
            <img
                class="flex justify-center w-28 rounded-md"
                src="/loader.gif"
                alt="logo"
            >
        </div>
        <form @submit.prevent="handleSubmit">
            <div
                class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto"
            >
                <label
                    for=""
                    class="text-xl font-semibold text-gray-900"
                >Add HMO Share</label>

                <div class="mt-5 b-6">
                    <label
                        for="hmo_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >HMO Name</label>
                    <input
                        id="hmoName"
                        v-model="hmoStore.hmo.hmo_name"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                    >
                </div>

                <div class="flex gap-4">
                    <div class="mt-5 b-6 flex-1">
                        <label
                            for="employer_share"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Employer's Share</label>
                        <input
                            id="employerShare"
                            v-model="hmoStore.hmo.employer_share"
                            type="number"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0.00"
                            required
                        >
                    </div>
                    <div class="mt-5 b-6 flex-1">
                        <label
                            for="employeeShare"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Employee's Share</label>
                        <input
                            id="employeeShare"
                            v-model="hmoStore.hmo.employee_share"
                            type="number"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0.00"
                            required
                        >
                    </div>
                </div>

                <div class="flex gap-4">
                    <div class="mt-5 b-6 flex-1">
                        <label
                            for="hmo_start"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >HMO Start</label>
                        <input
                            id="hmoStart"
                            v-model="hmoStore.hmo.hmo_start"
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
                            v-model="hmoStore.hmo.hmo_end"
                            type="date"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                        >
                    </div>
                </div>

                <div class="mt-5 mb-6">
                    <div class="flex items-center gap-4 justify-between">
                        <span
                            for="employee"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Employees</span>
                        <input
                            id="searchEmployees"
                            v-model="searchInput"
                            type="text"
                            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Employee Search"
                        >
                    </div>
                    <div class="flex flex-col p-4">
                        <div v-for="emp in hmoEmployees" :key="emp.id" class="flex flex-col">
                            <div class="flex justify-between py-2 border-b border-slate-100">
                                <div class="flex gap-2 items-center">
                                    <input v-model="emp.checked" type="checkbox">
                                    <span class="text-md text-slate-800">
                                        {{ emp.family_name + ", " + emp.first_name + " " }}
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
                                        <span class="rounded-full px-2 py-[1px] bg-green-400 text-white text-[11px]">Add-on</span>
                                    </div>
                                    <Icon name="iconoir:trash" class="text-slate-700 hover:text-red-500 cursor-pointer" @click="emp.members = removeMember(emp.members, member)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex gap-4 justify-end">
                    <NuxtLink
                        to="/hrms/setup/hmo"
                        class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                    >
                        Cancel
                    </NuxtLink>
                    <button
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
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
