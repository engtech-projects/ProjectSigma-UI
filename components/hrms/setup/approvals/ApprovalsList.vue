<script setup>

defineProps({
    approvalType: {
        type: String,
        required: true,
    },
    employeeSelector: {
        type: Boolean,
        required: true,
    },
    specificEmployee: {
        type: String,
        required: true,
    },
})

</script>

<template>
    <div>
        test
        <div>{{ approvalType }}</div>

        <div v-if="employeeSelector">
            <select v-model="selectedUserId">
                <option value="select" selected>
                    --Select--
                </option>
                <option v-for="userSelect in employeeUserList" :key="userSelect.id" :value="userSelect.id">
                    {{ userSelect.name }}
                </option>
            </select>
        </div>
        <div v-else>
            <span>{{ specificEmployee }}</span>
        </div>
    </div>
</template>
