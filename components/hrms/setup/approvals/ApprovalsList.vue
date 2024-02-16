<script setup>
import { storeToRefs } from "pinia"
import { useUserStore } from "@/stores/hrms/users"

const user = useUserStore()
const { employeeUserList } = storeToRefs(user)

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
        <div class="font-semibold text-black">
            {{ approval.type }}
        </div>

        <div v-if="approval.userselector">
            <select class="w-full" @change="changeValue(approval)">
                <option value="" disabled selected>
                    --Select--
                </option>
                <option v-for="userSelect in employeeUserList" :key="userSelect.id" :value="userSelect.id">
                    {{ userSelect.name }}
                </option>
            </select>
        </div>
        <div v-else>
            <span class="font-semibold">{{ approval.name }}</span>
        </div>
    </div>
</template>
