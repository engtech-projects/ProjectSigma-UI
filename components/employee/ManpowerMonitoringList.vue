<script setup>

const headers = [
    { text: "EMPLOYEE NAME", value: "employee_name" },
    { text: "ASSIGNED TO", value: "assigned_project" },
    { text: "REQUESTED TO", value: "requested_to" },
    { text: "STATUS", value: "status" },
    { text: "ACTIONS", value: "actions" },
]

const items = [
    {
        employee_name: "Juan Luna",
        assigned_project: "Butuan",
        requested_to: "CDO",
        status: "Pending",
    },
    {
        employee_name: "Jose Rizal",
        assigned_project: "Butuan",
        requested_to: "CDO",
        status: "Pending",
    },
    {
        employee_name: "Andress Boni",
        assigned_project: "Butuan",
        requested_to: "CDO",
        status: "Pending",
    },
    {
        employee_name: "Andress Boni",
        assigned_project: "Butuan",
        requested_to: "CDO",
        status: "Pending",
    },

]

const selectedItemDetails = ref(null)

const approveItem = (item) => {
    // Implement your approve logic here
    console.log("Item Approved:", item)
    // For demonstration purposes, let's update the item's action_taken
    item.action_taken = "APPROVED"
}

const denyItem = (item) => {
    // Implement your deny logic here
    console.log("Item Denied:", item)
    // For demonstration purposes, let's update the item's action_taken
    item.action_taken = "DENIED"
}

const viewItem = (item) => {
    // Implement your view logic here
    console.log("Viewing Item:", item)
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
        class="shadow-md p-4 mt-5 bg-white mb-3 border border-gray-200 rounded-lg w-full "
    >
        <div class="pb-2 text-black font-medium text-lg">
            Manpower Monitoring List
        </div>

        <EasyDataTable
            show-index
            :headers="headers"
            :items="items"
            class="mt-5"
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
