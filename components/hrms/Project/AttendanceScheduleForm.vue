<template>
    <div>
        <h2>Add Project Attendance Schedule</h2>
        <form @submit.prevent="addAttendanceSchedule">
            <!-- Attendance schedule form fields go here -->
            <label>Date:</label>
            <input v-model="attendanceSchedule.date" type="date" required>

            <label>Time:</label>
            <input v-model="attendanceSchedule.time" type="time" required>

            <label>Location:</label>
            <input v-model="attendanceSchedule.location" type="text" required>

            <button type="submit">
                Add Schedule
            </button>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            attendanceSchedule: {
                date: "",
                time: "",
                location: "",
            },
        }
    },
    methods: {
        addAttendanceSchedule () {
            // Code Here
        },
    },
}
</script>
