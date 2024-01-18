<script setup>

const headers = [
    { text: "EMPLOYEE NAME", value: "employee_name" },
    { text: "DEPARTMENT", value: "department_name" },
    { text: "ACTION TO BE TAKEN", value: "action_taken" },
    { text: "ACTIONS", value: "actions" },
]

const items = [
    {
        employee_name: "Juan Luna",
        department_name: "Accounting",
        action_taken: "BASIC SALARY",
        date_filed: "10/24/23",
        action_button: "1230",
    },
    {
        employee_name: "Jose Rizal",
        department_name: "Finance",
        action_taken: "EMPLOYMENT STATUS",
        date_filed: "10/24/23",
    },
    {
        employee_name: "Andress Boni",
        department_name: "IT",
        action_taken: "PROMOTION",
        date_filed: "10/24/23",
    },
    {
        employee_name: "Andress Boni",
        department_name: "IT",
        action_taken: "TRANSFER",
        date_filed: "10/24/23",
    },

]

const selectedItemDetails = ref(null)

const approveItem = (item) => {
    // Implement your approve logic here
    // console.log("Item Approved:", item)
    // For demonstration purposes, let's update the item's action_taken
    item.action_taken = "APPROVED"
}

const denyItem = (item) => {
    // Implement your deny logic here
    // return ("Item Denied:", item)
    // For demonstration purposes, let's update the item's action_taken
    item.action_taken = "DENIED"
}

const viewItem = (item) => {
    // Implement your view logic here
    // return ("Viewing Item:", item)
    // For simplicity, let's just store the selected item details and display them in a modal
    selectedItemDetails.value = item
}

const closeViewModal = () => {
    // Close the modal by resetting the selected item details
    selectedItemDetails.value = null
}

</script>

<template>
    <div
        class="shadow-md p-4 mt-6 bg-white mb-3 border border-gray-200 rounded-lg w-full md:w-1/2"
    >
        <div class="pb-2 text-black font-medium text-lg">
            Personnel Action Form List
        </div>

        <EasyDataTable
            show-index
            :headers="headers"
            :items="items"
            class="mt-5 z-0"
        >
            <template #item-actions="item">
                <button
                    @click="approveItem(item)"
                >
                    <Icon name="material-symbols:check-circle" color="green" class="w-5 h-5" />
                </button>
                <button
                    @click="denyItem(item)"
                >
                    <Icon name="material-symbols:cancel" color="red" class="w-5 h-5" />
                </button>
                <button
                    @click="viewItem(item)"
                >
                    <Icon name="material-symbols:visibility-rounded" color="blue" class="w-5 h-5" />
                </button>
            </template>
        </EasyDataTable>

        <div v-if="selectedItemDetails">
            <div class="fixed inset-0 bg-black opacity-50 " />
            <div class="fixed inset-0 flex items-center justify-center ">
                <div class="bg-white p-8 max-w-lg rounded-lg border border-slate-300">
                    <h2 class="text-lg font-semibold mb-4">
                        Item Details
                    </h2>
                    <ul>
                        <li><strong>Employee Name:</strong> {{ selectedItemDetails.employee_name }}</li>
                        <li><strong>Department:</strong> {{ selectedItemDetails.department_name }}</li>
                        <li><strong>Action Taken:</strong> {{ selectedItemDetails.action_taken }}</li>
                        <!-- Add more details as needed -->
                    </ul>
                    <button class="mt-4" @click="closeViewModal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
