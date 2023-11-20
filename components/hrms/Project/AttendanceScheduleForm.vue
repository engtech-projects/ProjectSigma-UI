<!-- components/AttendanceScheduleForm.vue -->

<template>
  <div>
    <h2>Add Project Attendance Schedule</h2>
    <form @submit.prevent="addAttendanceSchedule">
      <!-- Attendance schedule form fields go here -->
      <label>Date:</label>
      <input type="date" v-model="attendanceSchedule.date" required>

      <label>Time:</label>
      <input type="time" v-model="attendanceSchedule.time" required>

      <label>Location:</label>
      <input v-model="attendanceSchedule.location" type="text" required>

      <button type="submit">Add Schedule</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attendanceSchedule: {
        date: '',
        time: '',
        location: '',
      },
    };
  },
  methods: {
    addAttendanceSchedule() {
      // Make an API request to add a new attendance schedule
      // Example: Assume you have an API endpoint '/api/addAttendanceSchedule'
      this.$axios.post('/api/addAttendanceSchedule', this.attendanceSchedule)
        .then(response => {
          console.log('Attendance schedule added successfully:', response.data);
          // Reset the form or perform other actions as needed
        })
        .catch(error => {
          console.error('Error adding attendance schedule:', error);
          // Handle errors and display a message to the user
        });
    },
  },
};
</script>
