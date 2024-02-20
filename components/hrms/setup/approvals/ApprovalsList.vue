<script setup>
import { useUserStore } from "@/stores/hrms/users"

const user = useUserStore()
const { employeeUserList } = storeToRefs(user)

const props = defineProps({
    approval: {
        type: Object,
        required: true,
    },
    approvalIndex: {
        type: Number,
        required: true,
    }
})
const emit = defineEmits(["changeuserId"])

const changeuserId = (event) => {
    emit("changeuserId", props.approvalIndex, event.target.value)
}

</script>

<template>
    <div class="grid grid-cols-2 border border-slate-400 p-2">
        <div class="flex flex-col">
            <div class="font-semibold text-black">
                {{ approval.type }}
            </div>
        </div>

        <div class="flex flex-col">
            <div v-if="approval.userselector">
                <select class="w-full" @change="changeuserId">
                    <option disabled selected>
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
    </div>
</template>
