<script setup>
import { computed } from "vue"
import { useUserStore } from "@/stores/hrms/users"

const user = useUserStore()
const employeeUserList = computed(() => user.employeeUserList)

const props = defineProps({
    approval: {
        type: Object,
        required: true,
    },
})
const emit = defineEmits(["changeuserId"])

const changeValue = (event) => {
    emit("changeuserId", props.approval, event.target.value)
}
</script>

<template>
    <div>
        <div>{{ approval.type }}</div>
        <div v-if="approval.userselector">
            <select @change="changeValue">
                <option value="select" selected>
                    --Select--
                </option>
                <option v-for="userSelect in employeeUserList" :key="userSelect.user_id" :value="userSelect.user_id">
                    {{ userSelect.name }}
                </option>
            </select>
        </div>
        <div v-else>
            <span>{{ approval.name }}</span>
        </div>
    </div>
</template>
