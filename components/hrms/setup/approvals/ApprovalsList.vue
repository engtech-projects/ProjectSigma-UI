<script setup>
import { useUserStore } from "@/stores/hrms/users"

const user = useUserStore()
const { employeeUserList } = storeToRefs(user)

const model = defineModel({ required: true, type: Object })
</script>

<template>
    <div class="grid grid-cols-2 border border-slate-400 p-2">
        <div class="flex flex-col">
            <div class="font-semibold text-black">
                {{ model.type }}
            </div>
        </div>

        <div class="flex flex-col">
            <div v-if="model.userselector">
                <select v-model="model.user_id" class="w-full">
                    <option disabled selected>
                        --Select--
                    </option>
                    <option v-for="userSelect in employeeUserList" :key="userSelect.id" :value="userSelect.id">
                        {{ userSelect.name }}
                    </option>
                </select>
            </div>
            <div v-else>
                <span class="font-semibold">{{ model.name }}</span>
            </div>
        </div>
    </div>
</template>
